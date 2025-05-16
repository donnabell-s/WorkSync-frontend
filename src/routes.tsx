import { BrowserRouter, Route, Routes } from "react-router";
import * as Views from "./views/containers";
import { PATHS } from "./constant";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.ADMIN_MAIN.path} element={<Views.AdminMain />}>
          {/* ADD PPRIVATE ROUTES HERE (Routes that can only access after login like Dashboard, Account Setting, etc.) */}
          <Route path={PATHS.ADMIN_VIEW.DASHBOARD.path} element={<Views.Dashboard />} />
          <Route path={PATHS.ADMIN_VIEW.NOTIFICATION.path} element={<Views.Notifications />} />

          <Route path={PATHS.ROOM_MGNT.VIEW.path} element={<Views.ViewRooms />} />
          <Route path={PATHS.ROOM_MGNT.ADD.path} element={<Views.AddRoom />} />
          <Route path={PATHS.ROOM_MGNT.EDIT.path} element={<Views.EditRoom />} />
          <Route path={PATHS.ROOM_MGNT.DELETE.path} element={<Views.DeleteRoom />} />
          <Route path={PATHS.ROOM_MGNT.DETAIL.path} element={<Views.ViewRoomDetails />} />

          <Route path={PATHS.BOOKING_MGNT.VIEW.path} element={<Views.ViewBookings />} />
          <Route path={PATHS.BOOKING_MGNT.ADD.path} element={<Views.CreateBooking />} />
          <Route path={PATHS.BOOKING_MGNT.EDIT.path} element={<Views.EditBooking />} />
          <Route path={PATHS.BOOKING_MGNT.CANCEL.path} element={<Views.CancelBooking />} />
          <Route path={PATHS.BOOKING_MGNT.DETAIL.path} element={<Views.ViewBookingDetails />} />

          <Route path={PATHS.LOGS.ROOMS.path} element={<Views.RoomLogs />} />
          <Route path={PATHS.LOGS.BOOKINGS.path} element={<Views.BookingLogs />} />

          <Route path={PATHS.USER_MGNT.VIEW.path} element={<Views.ViewUsers />} />
          <Route path={PATHS.USER_MGNT.EDIT.path} element={<Views.EditUser />} />

          <Route path={PATHS.ADMIN_MGNT.VIEW.path} element={<Views.ViewAdmins />} />
          <Route path={PATHS.ADMIN_MGNT.EDIT.path} element={<Views.EditAdmin />} />
        </Route>
        
        <Route path={PATHS.USER_MAIN.path} element={<Views.UserMain />}>
          {/* ADD PPRIVATE ROUTES HERE (Routes that can only access after login like Dashboard, Account Setting, etc.) */}
          <Route path={PATHS.USER_VIEW.HOME.path} element={<Views.Home />} />
          <Route path={PATHS.USER_VIEW.ROOM_EXPLORER.path} element={<Views.RoomExplorer />} />
          <Route path={PATHS.USER_VIEW.BOOKINGS.path} element={<Views.MyBookings />} />
          <Route path={PATHS.USER_VIEW.BOOK.path} element={<Views.BookRoom />} />
          <Route path={PATHS.USER_VIEW.EDIT.path} element={<Views.EditBookedRoom />} />
          <Route path={PATHS.USER_VIEW.SETTINGS.path} element={<Views.Settings />} />
        </Route>
        {/* ADD PUBLIC ROUTES HERE (e.g., Login, Sign Up, Forgot Pass, etc. ) */}
        <Route path={PATHS.LOGIN.path} element={<Views.Login />} />
        <Route path={PATHS.SIGNUP.path} element={<Views.Signup />} />
        <Route path={PATHS.LOGOUT.path} element={<Views.Logout />} />
        <Route path={PATHS.FORGOT_PASS.path} element={<Views.ForgotPassword />} />
        <Route path={PATHS.RESET_PASS.path} element={<Views.ResetPassword />} />
        <Route path={PATHS.SIGNUP.path} element={<Views.Signup />} />
        {/* <Route path={PATHS.NOT_FOUND.path} element={<Views.NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};