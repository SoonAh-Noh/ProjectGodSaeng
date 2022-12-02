import Pagination from 'react-js-pagination';
const Page = ({ page, totalcnt, setPage, itemcount }) => {
  //현재 테이블 의 페이징 처리용 공용 pagination 컴포넌트
  return (
    <Pagination
      activePage={page} //현재 활성화된 페이지
      itemsCountPerPage={itemcount} //한페이지에 몇개 보여줄건지
      totalItemsCount={totalcnt} //총 게시글 갯수
      pageRangeDisplayed={5} //페이지 번호를 몇개까지 보여줄건지?
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  );
};
export default Page;
