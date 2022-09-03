import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		userinfo: {},
		notify: [],
		courses: [],  //所有课程
		myCourses: [] //已选课程
	},
	mutations: {
		setUserInfo(state, data) {
			state.userinfo = data
		},
		setSingleUIAttr(state, info) {
			for (let i in info) {
				if (info[i]) {
					state[i] = info[i]
				}
			}
		},
		setNotify(state, data) {
			state.notify = data
		},
		markNotifyWasRead(state, index) {
			state.notify[index].wasRead = true;
		},
		setCourses(state, data) {
			state.courses = data
		},
		selectCourse(state, index) {
			state.courses[index].selected = true;
		},
		dropOutCourse(state, index) {
			state.courses[index].selected = false;
		},
		setExerciseAchive(state, run) {
			state.userinfo.run.push(run)
		}
	}
})
export default store
