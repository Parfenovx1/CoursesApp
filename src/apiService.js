import axios from 'axios';

class ApiService {
	getCourses() {
		return axios.get('http://localhost:3000/courses/all');
	}

	addCourse(course, token) {
		return axios.post('http://localhost:3000/courses/add', course, {
			headers: {
				Authorization: token,
			},
		});
	}

	getCourse(id) {
		return axios.get(`http://localhost:3000/courses/${id}`);
	}

	updateCourse(id, updatedCourse, token) {
		return axios.put(`http://localhost:3000/courses/${id}`, updatedCourse, {
			headers: {
				Authorization: token,
			},
		});
	}

	deleteCourse(id, token) {
		return axios.delete(`http://localhost:3000/courses/${id}`, {
			headers: {
				Authorization: token,
			},
		});
	}

	getAuthors() {
		return axios.get('http://localhost:3000/authors/all');
	}

	addAuthor(author, token) {
		return axios.post('http://localhost:3000/authors/add', author, {
			headers: {
				Authorization: token,
			},
		});
	}

	login(obj) {
		return axios.post('http://localhost:3000/login', obj);
	}

	logout(token) {
		return axios.delete('http://localhost:3000/logout', {
			headers: {
				Authorization: token,
			},
		});
	}

	register(obj) {
		return axios.post('http://localhost:3000/register', obj);
	}

	me(token) {
		return axios.get('http://localhost:3000/users/me', {
			headers: {
				Authorization: token,
			},
		});
	}
}

export default new ApiService();
