import { For, createResource } from 'solid-js';
import axios from 'axios';
// import { User, UserDocument } from '@nx-go-playground/api/users';

function getUsers() {
  return axios.get('http://localhost:8080/api/users').then((r: any) => r.data);
}
function deleteUser(id: string) {
  return axios.delete(`http://localhost:8080/api/users/${id}`);
}

const Users = () => {
  // const [data, setData] = createSignal([]);
  const [data] = createResource(getUsers, { initialValue: [] });
  // console.log('data', data());
  // createEffect(() => {
  //   // getUsers();
  //   //   .then(setData);
  // });

  const deleteItem = (id: string) => {
    deleteUser(id).then(() => {
      getUsers();
    });
  };
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Users</h1>
      <div>
        data here
        <For each={data()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.lastName}</div>
                <div class="py-6 w-full">{item.firstName}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item.id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default Users;
