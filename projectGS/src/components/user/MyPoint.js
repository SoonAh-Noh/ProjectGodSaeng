import PointListComponent from '../common/PointListComponent';
const MyPoint = () => {
  return (
    <PointListComponent user_id={window.sessionStorage.getItem('USER_ID')} />
  );
};
export default MyPoint;
