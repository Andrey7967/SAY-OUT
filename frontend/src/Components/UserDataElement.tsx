import '../css/message.css';
import useDeleteMessage from '../hooks/useDeleteMessage';
import useDeleteUser from '../hooks/useDeleteUser';
interface MessageProps {
  id: number;
  nickname: string;
  email: string;
}

export default function UserDataElement({ id, nickname, email }: MessageProps) {
  const { deleteFunc } = useDeleteUser();
  return (
    <div className="row mb-3 p64 align-items-center border-bottom py-2">
      <div className="col-md-4">
        <div className="d-flex align-items-center">
          <div>
            <strong>{nickname}</strong>
          </div>
        </div>
      </div>

      <div className="col-md-5">
        <a href="mailto:ivan@example.com" className="text-decoration-none">
          {email}
        </a>
      </div>

      <div className="col-md-3">
        <button
          className="btn btn-outline-danger btn-sm p64 "
          onClick={() => deleteFunc(id)}
        >
          <i className="bi bi-trash"></i> delete
        </button>
      </div>
    </div>
  );
}
