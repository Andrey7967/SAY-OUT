import { useAppSelector } from '../states/Store';

export default function UserData({ handleEdit }) {
  const email = useAppSelector((state) => state.app.loggedEmail);
  const name = useAppSelector((state) => state.app.loggedNickname);
  return (
    <div
      className="d-flex flex-column border p-3 rounded shadow-sm p64 width80"
      style={{}}
    >
      {/* 1. Поле для Имени */}
      <div className="mb-3 p-2 border rounded bg-light">
        <strong className="text-primary me-2">nickname:</strong>
        <span>{name}</span>
      </div>

      {/* 2. Поле для Почты */}
      <div className="mb-3 p-2 border rounded bg-light">
        <strong className="text-primary me-2">email:</strong>
        <span>{email}</span>
      </div>

      {/* Кнопка с действием */}
      <button className="btn btn-sm btn-success mt-1 p64" onClick={handleEdit}>
        edit info
      </button>
    </div>
  );
}
