import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouteMatch } from 'react-router-dom';
// import HeaderContainer from 'src/containers/HeaderContainer/Index';
// import { resetPage } from 'src/store/action/socialPageAction';
// import { getInfoMeReq } from 'src/store/action/userAction';
// import SocialEmptyLayout from 'src/components/SocialEmptyLayout';
function NoMatchRoutes() {
  // const match = useRouteMatch();
  // const user = useSelector((state: any) => state.meReducer);
  // const dispatch = useDispatch();
  // const getDataMeInfo = useCallback(() => {
  //   if (!user?.info?.id) {
  //     dispatch(getInfoMeReq());
  //   }
  // }, [!user?.info?.id]);
  // React.useEffect(() => {
  //   getDataMeInfo();
  //   dispatch(resetPage());
  // }, [match.path]);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95vh'
      }}
    >
      Empty
      {/* <HeaderContainer user={user?.info} />
      <SocialEmptyLayout
        icon="fa-light fa-link"
        primaryText="Trang này không hiển thị"
        secondaryText="Có thể liên kết đã hỏng hoặc trang bị gỡ. Hãy kiểm tra xem liên kết mà
        bạn đang cố mở có chính xác không."
      /> */}
    </div>
  );
}

export default NoMatchRoutes;
