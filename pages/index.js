import React from 'react';
import { createId } from '@paralleldrive/cuid2';

const Home = () => {
  const [list, setList] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [error, setError] = React.useState('');
  const [sortStatus, setSortStatus] = React.useState('asc');

  const getItemById = (list, selectedId) => {
    return list.findIndex((obj) => obj.id === selectedId);
  };

  const addTodo = () => {
    const isExisting = list.find((obj) => obj?.name?.toLowerCase() === currentItem.name.toLowerCase());
    const isFieldEmpty = !currentItem?.name;

    // Add item to todo list
    if (!isFieldEmpty && !isExisting && !isEdit) {
      console.log('current');
      setList((prevList) => [...prevList, currentItem]);
      setError('');
      return setCurrentItem({}); // resets field
    }

    // edit selected item
    if (isEdit && !isFieldEmpty) {
      setList((prevList) => {
        const tempList = [...prevList];
        const itemIndex = getItemById(tempList, currentItem.id);
        if (itemIndex !== -1) {
          tempList[itemIndex] = { ...tempList[itemIndex], name: currentItem.name };
        }
        return tempList;
      });

      console.log(list);
      setIsEdit(false);
      setCurrentItem({}); // resets field
      return setError('');
    }

    if (isExisting && !isEdit) {
      return setError('Item already exist!');
    }

    return setError('Field is required!');
  };

  const editItem = (id) => {
    const itemIndex = getItemById(list, id);

    setCurrentItem({
      id: list[itemIndex].id,
      name: list[itemIndex].name,
    });
    setIsEdit(true);

    return setError('');
  };

  const deleteItem = (id) => {
    const removedSelectedItemList = list.filter((item) => {
      return item.id !== id;
    });

    setCurrentItem({}); // resets field
    setIsEdit(false);
    setList(removedSelectedItemList);

    return setError('');
  };

  const sortAsc = () => {
    const sortByName = [...list].sort((a, b) => a.name.localeCompare(b.name));
    setSortStatus('desc'); // resets sort status to desc
    setList(sortByName);
  };

  const sortDesc = () => {
    const sortByName = [...list].sort((a, b) => b.name.localeCompare(a.name));
    setSortStatus('asc'); // resets sort status to asc
    setList(sortByName);
  };

  const renderList = list.map((item) => {
    return (
      <tr key={item.id}>
        <td colSpan={4} className="p-2">
          {item.name}
        </td>
        <td className="flex justify-center items-center">
          <button onClick={() => editItem(item.id)}>
            <svg className="icon text-lg mr-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M31.999 8.383c0-0.003 0-0.006 0-0.010 0-0.439-0.177-0.837-0.464-1.126l-6.783-6.783c-0.289-0.287-0.687-0.464-1.126-0.464-0.003 0-0.007 0-0.010 0h0.001c-0.003-0-0.006-0-0.009-0-0.439 0-0.838 0.177-1.127 0.464l-22.014 22.014c-0.287 0.289-0.464 0.688-0.464 1.127 0 0.003 0 0.006 0 0.009v-0 6.783c0 0.884 0.716 1.6 1.6 1.6v0h6.783c0.026 0.001 0.056 0.002 0.086 0.002 0.441 0 0.84-0.178 1.13-0.466l-0 0 17.391-17.487 4.544-4.448c0.146-0.155 0.266-0.333 0.352-0.528 0.016-0.128 0.016-0.256 0-0.384 0.004-0.034 0.006-0.073 0.006-0.112s-0.002-0.078-0.006-0.117l0 0.005 0.112-0.080zM7.729 28.798h-4.528v-4.528l15.887-15.887 4.528 4.528-15.887 15.887zM25.871 10.655l-4.528-4.528 2.272-2.256 4.512 4.512-2.256 2.272z"></path>
            </svg>
          </button>
          <button onClick={() => deleteItem(item.id)}>
            <svg className="icon text-lg w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M12.8 25.6c0.884 0 1.6-0.716 1.6-1.6v0-9.6c0-0.884-0.716-1.6-1.6-1.6s-1.6 0.716-1.6 1.6v0 9.6c0 0.884 0.716 1.6 1.6 1.6v0zM28.8 6.4h-6.4v-1.6c0-2.651-2.149-4.8-4.8-4.8v0h-3.2c-2.651 0-4.8 2.149-4.8 4.8v0 1.6h-6.4c-0.884 0-1.6 0.716-1.6 1.6s0.716 1.6 1.6 1.6v0h1.6v17.6c0 2.651 2.149 4.8 4.8 4.8v0h12.8c2.651 0 4.8-2.149 4.8-4.8v0-17.6h1.6c0.884 0 1.6-0.716 1.6-1.6s-0.716-1.6-1.6-1.6v0zM12.8 4.8c0-0.884 0.716-1.6 1.6-1.6v0h3.2c0.884 0 1.6 0.716 1.6 1.6v0 1.6h-6.4v-1.6zM24 27.2c0 0.884-0.716 1.6-1.6 1.6v0h-12.8c-0.884 0-1.6-0.716-1.6-1.6v0-17.6h16v17.6zM19.2 25.6c0.884 0 1.6-0.716 1.6-1.6v0-9.6c0-0.884-0.716-1.6-1.6-1.6s-1.6 0.716-1.6 1.6v0 9.6c0 0.884 0.716 1.6 1.6 1.6v0z"></path>
            </svg>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="flex-col w-full h-full p-8 mt-10 max-w-4xl m-auto bg-white border border-gray-300 shadow-xl rounded-xl flex justify-start items-center min-h-[20rem] relative">
      <h1 className=" text-center text-3xl font-bold mb-8">TODO List</h1>

      <div className="flex w-full">
        <div className="flex flex-col w-full">
          <input
            placeholder="Add a Task"
            name="todo"
            className={`p-3 rounded-l-lg border ${error ? 'border-red-500' : ''}`}
            value={currentItem.name || ''}
            onInput={(e) => setCurrentItem({ id: currentItem.id || createId(), name: e.target.value })}
          />
          <span className="text-red-500 mt-1">{error}</span>
        </div>

        <button
          className="p-2 h-[3.125rem] bg-slate-900 text-white text-sm min-w-[5rem] rounded-r-lg"
          onClick={() => addTodo()}
        >
          {isEdit ? 'Edit Item' : 'Add Item'}
        </button>
      </div>

      {list.length ? (
        <table className="w-full mt-4 table-fixed">
          <tbody className="w-full">
            <tr>
              <th
                className="cursor-pointer"
                colSpan={4}
                onClick={() => (sortStatus === 'asc' ? sortAsc() : sortDesc())}
              >
                Todo Name
                <svg className="icon ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M12.805 9.602h17.596c0.96 0 1.6-0.64 1.6-1.6s-0.64-1.6-1.6-1.6h-17.596c-0.96 0-1.6 0.64-1.6 1.6s0.64 1.6 1.6 1.6zM5.926 21.279v-10.557c0.32 0.32 0.64 0.48 0.96 0.48 0.48 0 0.8-0.16 1.12-0.32 0.64-0.64 0.8-1.6 0.16-2.239l-2.719-3.199c-0.32-0.48-0.64-0.64-1.12-0.64s-0.96 0.16-1.28 0.64l-2.719 3.199c-0.48 0.64-0.48 1.6 0.32 2.239 0.64 0.48 1.44 0.48 2.079 0v10.558c-0.64-0.48-1.44-0.64-2.079 0s-0.8 1.6-0.16 2.239l2.719 3.199c0.16 0.16 0.64 0.32 1.12 0.32s0.96-0.16 1.28-0.64l2.719-3.199c0.64-0.64 0.48-1.76-0.16-2.239-0.8-0.48-1.76-0.48-2.239 0.16zM30.4 14.4h-17.596c-0.96 0-1.6 0.64-1.6 1.6s0.64 1.6 1.6 1.6h17.596c0.96 0 1.6-0.64 1.6-1.6s-0.64-1.6-1.6-1.6zM30.4 22.398h-17.596c-0.96 0-1.6 0.64-1.6 1.6s0.64 1.6 1.6 1.6h17.596c0.96 0 1.6-0.64 1.6-1.6s-0.64-1.6-1.6-1.6z"></path>
                </svg>
              </th>
              <th>Action</th>
            </tr>
            {renderList}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">There are no to-do list yet!</p>
      )}
    </div>
  );
};

export default Home;
