export default function({ dispatch }) {
  return next => action => {
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    action.payload
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        const newAction = { ...action, payload: json };
        debugger;
        dispatch(newAction);
      });
  }
}