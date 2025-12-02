import '../css/message.css';
import useDeleteMessage from '../hooks/useDeleteMessage';
interface MessageProps {
  id: number;
  content: string;
  nickname: string;
  email: string;
}

export default function Message({
  id,
  nickname,
  email,
  content,
}: MessageProps) {
  const { deleteFunc } = useDeleteMessage();
  return (
    <div className="container  p64 p-0 ">
      <div className="card">
        <div className="card-body p-0">
          <div className="row mb-3 border-bottom pb-3">
            <div className="col-sm-6">
              <h6 className="mb-1 text-primary p64">author</h6>
              <p className="mb-0 fw-bold">{nickname}</p>
            </div>
            <div className="col-sm-6">
              <h6 className="mb-1 text-primary p64">Email</h6>
              <p className="mb-0">{email}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h6 className="text-muted mb-2">message text</h6>
              <div className="bg-light  rounded">
                <p className="mb-0">{content}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h6 className="mb-1 text-primary">action</h6>
              <button
                className="btn btn-primary p64"
                onClick={() => deleteFunc(id)}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div className={'p64 flex-grow-1 messageAuthor'}>
//     <div className="">
//       <div className="content ">{content}</div>
//
//     </div>
//   </div>
