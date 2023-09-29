<script lang="ts">
import imgMoneyFed from './assets/images/money-fed.gif'
import imgRent from './assets/images/rent.png'

// const mrFluffles = {
// 	name: "Mr Fluffles",
// 	sayHi: function (){
// 		console.log(`Hi my name is ${this.name}`);
// 	},
// 	sayBye: () =>{
// 		console.log(`Byyye ${this}`);
// 	}
// }

export default {
	data() {
		return {
			count: 0,

			// Instead of useState and onChange in the input field
			// username: "anonymous haxx0r",
			username: '',

			// In react you would need to map in order to receive a form of jsx but Vue is much simpler
			todos: [
				{ id: 1, title: 'Make coffee', completed: true },
				{ id: 2, title: 'Drink coffee', completed: false },
				{ id: 3, title: 'Drink MORE coffee', completed: false },
				{ id: 4, title: 'Drink ALL THE coffee', completed: false },
			],

			salary: 10,

			showBox: false,

			x: 0,
			y: 0,
		}
	},
	//Dynamically generated data!
	methods: {
		increaseSalary(amount = 1) {
			this.salary += amount
		},

		decreaseSalary(amount = 1) {
			this.salary -= amount
		},

		getSalaryImage() {
			return this.salary >= 50 ? imgMoneyFed : imgRent
		},

		toggleBox(){
			this.showBox = !this.showBox
		},
		// can check the type below
		updateCoords(e: MouseEvent) {
			// console.log(e);
			// console.log(e.offsetX, e.offsetY);
			this.x = e.offsetX
			this.y = e.offsetY

		}
	},

	// computed are Dynamically generated data!
	computed: {
		displayName() {
			// return username doesn´t work in an object
			// return this.username ? this.username : "anonymous haxx0r";
			// username input field is not changed displayName is!!
			return this.username || 'anonymous haxx0r'
		},

		salaryClass() {
			return this.salary >= 20 ? 'good-salary' : 'bad-salary'
		},
	},
}
</script>

<template>
	<div class="container">
		<h1>Vue.js basics</h1>

		<section class="basics">
			<h2>MSG</h2>
			<!-- use {{  }} instead of {} like in React -->
			<p>You have clicked the button: {{ count }} times.</p>
			<!-- use v-on: and you have access to a series of options or you can use @ before the function -->
			<button class="btn btn-success btn-lg" v-on:click="count++">Click meee! 😃</button>
			<!-- <button class="btn btn-success btn-lg" @click="count++">Click meee! 😃</button> -->

			<hr />

			<div class="mb-3">
				<!-- v-model = username instead of useState and adding a function with setName in the input field, much simpler -->
				<!-- Can check and debug use vue.js devtools -->
				<input
					type="text"
					class="form-control"
					placeholder="Enter your name"
					v-model="username"
				/>
			</div>

			<!-- <p>Hello, {{username}}!</p> -->
			<p>Hello, {{ displayName }}!</p>
		</section>

		<hr />

		<section class="todos">
			<h2>Todos</h2>
			<ul>
				<!-- <li>I am a procastrinated todo 😰</li> -->
				<!-- <li class="completed">I am a completed todo 😁</li> -->

				<!-- You need a v-bind:key in order to give an unique id to every Todo!! -->
				<!-- <li
					v-for="todo in todos"
					v-bind:key="todo.id"
				> -->
				<!-- <li
					v-for="todo in todos"
					:key = "todo.id"
					v-on:click="() =>{}"
					@click = "() =>{}"
				> -->
				<!-- : is shorthand to v-bind like @ v-on!! -->
				<li
					v-for="todo in todos"
					:key="todo.id"
					v-bind:class="todo.completed ? 'completed' : ''"
				>
					<!-- Mapping the object array and no Map like in react!! WOOOOWW!! -->
					{{ todo.title }}
				</li>
			</ul>
		</section>

		<hr />

		<section class="salary">
			<!-- <p>Salary per hour: <span :class="salary >= 20 ? '':''">{{salary}} &euro;</span></p> -->
			<p>
				Salary per hour: <span :class="salaryClass">{{ salary }} &euro;</span>
			</p>

			<!-- <img src="/src/assets/images/salary.png" class="img-fluid img-salary" /> -->
			<!-- <img v-bind:src="getSalaryImage()" class="img-fluid img-salary" /> -->
			<!-- Shorthand version of v-bind is just : -->
			<img :src="getSalaryImage()" class="img-fluid img-salary" />

			<div class="buttons">
				<div class="mb-1">
					<button
						class="btn btn-warning btn-lg"
						@click.exact="decreaseSalary()"
						@click.alt="decreaseSalary(50)"
					>
						Decrease 1 &euro; 😢
					</button>

					<!-- <button class="btn btn-primary btn-lg" @click="salary++">Increase 1 &euro; 🤑</button> -->
					<!-- .exact works only when I click the button it would never work if I click the button + shift or ctrl or anything else together with click -->
					<!-- clicking + alt now increase the salary to 50! -->
					<button
						class="btn btn-primary btn-lg ms-2"
						@click.exact="increaseSalary()"
						@click.alt="increaseSalary(50)"
					>
						Increase 1 &euro; 🤑
					</button>
				</div>
				<div>
					<!-- <button class="btn btn-danger btn-lg" @click="salary+=5">Decrease 5 &euro; 😢😢😢</button> -->
					<button
						class="btn btn-success btn-lg mt-2 ms-2"
						@click.exact="decreaseSalary(5)"
						@click.shift="decreaseSalary(100)"
					 >
						Decrease 5 &euro; 🤑🤑🤑
					</button>

					<!-- <button class="btn btn-success btn-lg" @click="salary+=5">Increase 5 &euro; 🤑🤑🤑</button> -->
					<button
						class="btn btn-success btn-lg mt-2 ms-2"
						@click.exact="increaseSalary(5)"
						@click.shift="increaseSalary(100)"
					 >
						Increase 5 &euro; 🤑🤑🤑
					</button>
				</div>
			</div>
		</section>

		<hr />

		<section class="box">
			<div class="mb-3">
				<button class="btn btn-primary btn-lg" @click="toggleBox">🏃🏻</button>
			</div>

			<!-- <div class="grey-box" v-if="showBox">
				<div class="coords">42, 1337</div>
			</div> -->
			<!-- v-show toggles with display none! -->
			<!-- can shorten v-on wirh @mousemove -->
			<!-- <div class="grey-box" v-show="showBox" v-on:mousemove="updateCoords"> -->
			<div class="grey-box" v-show="showBox" @mousemove="updateCoords">
				<!-- <div class="coords">42, 1337</div> -->
				<div class="coords">{{x}}, {{y}}</div>
			</div>

			<!-- <p class="d-none" v-if="!showBox">No 📦 for you!</p> -->
			<!-- <p class="d-none" v-else>No 📦 for you!</p> -->
			<!-- <p  v-else>No 📦 for you!</p> -->
			<!-- v-show toggles with display none! -->
			<p  v-show="!showBox">No 📦 for you!</p>
		</section>
	</div>
</template>
