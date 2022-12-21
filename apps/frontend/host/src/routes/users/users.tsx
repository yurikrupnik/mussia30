import { createEffect, createSignal, For } from 'solid-js';
import axios from 'axios';
// import { User, UserDocument } from '@nx-go-playground/api/usesssrs';

function getUsers() {
  return (
    axios
      .get('http://localhost:8080/users')
      // .get('http://localhost:4000/api/users')
      // .get('/api/projects')
      .then((r: any) => r.data)
  );
}

const Predictions = () => {
  const [data, setData] = createSignal([]);
  createEffect(() => {
    getUsers().then((res: any) => {
      setData(res);
    });
  });
  return (
    <div>
      <h1>Predictions</h1>
      <div>
        data here
        <For each={data()}>
          {(item: any) => {
            return <div>{item._id}</div>;
          }}
        </For>
      </div>
    </div>
  );
};

export default Predictions;
