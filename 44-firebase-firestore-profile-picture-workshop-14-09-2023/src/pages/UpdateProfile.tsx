import { FirebaseError } from "firebase/app";
import {
//   deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image"; // Import Image from react-bootstrap
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { storage } from "../services/firebase";
import { UpdateProfileFormData } from "../types/User.types";

const UpdateProfile = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    currentUser,
    reloadUser,
    setDisplayName,
    setEmail,
    setPassword,
    setPhotoUrl,
  } = useAuth();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      email: currentUser?.email ?? "",
      name: currentUser?.displayName ?? "",
    },
  });

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const photoFileRef = useRef<FileList | null>(null);
  photoFileRef.current = watch("photoFile");

  if (!currentUser) {
    return <p>Error, error, error!</p>;
  }

  const uploadFileWithProgress = async (file: File) => {
    const fileRef = ref(storage, `photos/${currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setErrorMessage("Upload failed!");
      },
      () => {
        console.log("Upload complete");

        getDownloadURL(uploadTask.snapshot.ref)
          .then((photoUrl) => {
            console.log(
              "Photo successfully uploaded, download URL is:",
              photoUrl
            );
            setPhotoUrl(photoUrl);
            setUploadProgress(0);
          })
          .catch((error) => {
            console.error("Error getting download URL", error);
            setErrorMessage("Error getting download URL");
          });
      }
    );

    try {
      await uploadTask;
    } catch (error) {
      console.error("Upload task error", error);
      setErrorMessage("Upload task error");
    }
  };

//   const deleteProfilePicture = async (file: File) => {
// 	try {
// 		// Check if there is a user photo URL
// 		if (!setPhotoUrl) {
// 			return;
// 		}

// 		// Delete the profile picture from Firebase Storage
// 		const profilePictureRef = ref(
// 			storage,
// 			`photos/${currentUser?.uid}/${file.name}`
// 		);
// 		await deleteObject(profilePictureRef);

// 		// Set the photoURL to null in the authentication user profile
// 		await setPhotoUrl(null);
// 		} catch (error) {
// 		console.error("Error deleting profile picture:", error);
// 		setErrorMessage("Error deleting profile picture");
// 		}
//   };

  const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
    setErrorMessage(null);

    try {
      setLoading(true);

      if (data.name !== (currentUser.displayName ?? "")) {
        await setDisplayName(data.name);
      }

      if (data.photoFile.length) {
        const photo = data.photoFile[0];
        uploadFileWithProgress(photo);
      }

      if (data.email !== (currentUser.email ?? "")) {
        await setEmail(data.email);
      }

      if (data.password) {
        await setPassword(data.password);
      }

      await reloadUser();

      toast.success("Profile successfully updated");
      setLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Something went wrong. Have you tried turning it off and on again?"
        );
      }
      setLoading(false);
    }
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Update Profile</Card.Title>

              {errorMessage && (
                <Alert variant="danger">{errorMessage}</Alert>
              )}

              {/* Display the profile picture if it exists */}
              {currentUser.photoURL ? (
                <div className="mb-3">
                  <Image
                    src={currentUser.photoURL}
                    alt="Profile Picture"
                    height={100}
                    width={100}
                    roundedCircle
                  />
                  <Button
                    variant="danger"
                    /* onClick={() => deleteProfilePicture(photoFileRef.current[0])} */
                    className="mt-2"
                  >
                    Delete Profile Picture
                  </Button>
                </div>
              ) : (
                // Display a placeholder image if no profile picture exists
                <div className="mb-3">
                  <Image
                    src="/placeholder-image.png"
                    alt="Placeholder"
                    height={100}
                    width={100}
                    roundedCircle
                  />
                </div>
              )}
              <Form onSubmit={handleSubmit(onUpdateProfile)}>
                <Form.Group controlId="displayName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Sean Banan"
                    type="text"
                    {...register("name", {
                      minLength: {
                        value: 3,
                        message:
                          "If you have a name, it has to be at least 3 characters long",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="invalid">
                      {errors.name.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Form.Group controlId="photo" className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <div className="d-flex align-items-center">
					<Form.Control
						type="file"
						placeholder= ""
						accept="image/gif,image/jpeg,image/png,image/webp"
						{...register("photoFile", {
						validate: {
							fileSize: (value) => {
							if (value[0]) {
								const file = value[0];
								const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
								if (file.size > maxSizeInBytes) {
								return `File size must be less than 5MB`;
								}
							}
							return true;
							},
						},
						})}
						onChange={(e) => {
						if (
							e.target instanceof HTMLInputElement &&
							e.target.files &&
							e.target.files.length > 0
						) {
							uploadFileWithProgress(e.target.files[0]);
						}
						}}
					/>
					{uploadProgress > 0 && uploadProgress < 100 && (
						<div>
						Uploading: {Math.round(uploadProgress)}%
						</div>
					)}
					</div>
					{errors.photoFile && (
					<p className="invalid">{errors.photoFile.message}</p>
					)}
					{photoFileRef.current && photoFileRef.current.length > 0 && (
					<p>
						Selected File: {photoFileRef.current[0].name} (
						{Math.round(photoFileRef.current[0].size / 1024)} kB)
					</p>
					)}
					<Form.Text>
					Allowed formats: GIF, JPEG, PNG, or WebP. Maximum file size: 5MB.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="email" className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
					placeholder="snelhest2000@horsemail.com"
					type="email"
					{...register("email", {
						required: "You have to enter an email",
					})}
					/>
					{errors.email && (
					<p className="invalid">
						{errors.email.message ?? "Invalid value"}
					</p>
					)}
				</Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="invalid">
                      {errors.password.message ?? "Invalid value"}
                    </p>
                  )}
                  <Form.Text>At least 6 characters</Form.Text>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    {...register("passwordConfirm", {
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters",
                      },
                      validate: (value) => {
                        return (
                          !passwordRef.current ||
                          value === passwordRef.current ||
                          "The passwords do not match 🤦🏼‍♂️"
                        );
                      },
                    })}
                  />
                  {errors.passwordConfirm && (
                    <p className="invalid">
                      {errors.passwordConfirm.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>

                <Button
                  disabled={loading}
                  variant="primary"
                  type="submit"
                >
                  {loading ? "Updating profile..." : "Save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
