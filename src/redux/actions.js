export const ADD_GAME = 'ADD_GAME';
export const GAME_DELETED = 'GAME_DELETED';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';
export const SET_GAMES = 'SET_GAMES';

const DEFAULT_HEADERS = {
	"Content-Type": "application/json"
};

export function fetchGames() {
	return dispatch => {
		return fetch('/api/games')
			.then(res => res.json())
			.then(data => dispatch(setGames(data.games)));
	};
}

export function fetchGame(id) {
	return dispatch => {
		return fetch(`/api/games/${id}`)
			.then(res => res.json())
			.then(data => dispatch(gameFetched(data.game)));
	};
}

export function saveGame(data) {
	return dispath => {
		return fetch('/api/games', {
			method: 'post',
			body: JSON.stringify(data),
			headers: DEFAULT_HEADERS
		}).then(handleResponse)
		.then(data => dispath(addGame(data.game)));
	}
}

export function updateGame(data) {
	return dispath => {
		return fetch(`/api/games/${data._id}`, {
			method: 'put',
			body: JSON.stringify(data),
			headers: DEFAULT_HEADERS
		}).then(handleResponse)
		.then(data => dispath(gameUpdated(data.game)));
	}
}

export function deleteGame(id) {
	return dispath => {
		return fetch(`/api/games/${id}`, {
			method: 'delete',
			headers: DEFAULT_HEADERS
		}).then(handleResponse)
		.then(() => dispath(gameDeleted(id)));
	}
}

export function addGame(game) {
	return {
		type: ADD_GAME,
		game
	};
}

export function setGames(games) {
	return {
		type: SET_GAMES,
		games
	};
}

export function gameDeleted(gameId) {
	return {
		type: GAME_DELETED,
		gameId
	};
}

export function gameFetched(game) {
	return {
		type: GAME_FETCHED,
		game
	};
}

export function gameUpdated(game) {
	return {
		type: GAME_UPDATED,
		game
	};
}

function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}
