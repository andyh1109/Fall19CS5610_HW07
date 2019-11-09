
import store from './store';

export function post(path, body, message) {
if (message == "login"){

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}
  let state = store.getState();
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

 function post_login(path, body) {

  return fetch('/ajax' + path, {
    method: 'post_login',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}




export function submit_new_sheet(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_sheet;

  if (data.date == null) {
    return;
  }

    post('/sheets', {
      sheet: {
        date: data.date,
        status: data.approval,
        worker_id: 1,
      }
    }, "newSheet").then((resp) => {
      console.log(resp);
      if (resp.data) {
        store.dispatch({
          type: 'ADD_SHEETS',
          data: [resp.data],
        });
        form.redirect('/sheets/' + resp.data.id);
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_PHOTO',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
 

  reader.readAsDataURL(data.file);
}


export function list_jobs(){
  get('/jobs')
    .then((resp)=>{
      console.log("list_jobs", resp);
      store.dispatch({
        type: 'ADD_JOBS', 
	data: resp.data,
      });
    });
}



export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;

  post('/sessions', data, "login")
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}
