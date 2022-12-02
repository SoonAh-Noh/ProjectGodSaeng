const ColGroup = ({ page }) => {
  return (
    <colgroup>
      {page === 'notice' && (
        <>
          <col width="80px" />
          <col width="60%" />
          <col width="" />
          <col width="" />
        </>
      )}
      {page === 'user_report' && (
        <>
          <col width="80px" />
          <col width="60%" />
          <col width="" />
          <col width="" />
        </>
      )}
      {page === 'admin_report' && (
        <>
          <col width="80px" />
          <col width="60%" />
          <col width="" />
          <col width="" />
        </>
      )}
    </colgroup>
  );
};
export default ColGroup;
