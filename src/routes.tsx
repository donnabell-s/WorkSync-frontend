import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import * as Views from "./views/containers";
import { PATHS } from "./constant";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './views/components/ProtectedRoute';
import { RoomProvider } from "./context/RoomContext";
import { AdminProvider } from "./context/AdminContext";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoomProvider>
          <AdminProvider>
            <Routes>
              <Route path="/" element={<Navigate to={PATHS.LOGIN.path} />} />

              {/* Admin Routes */}
              <Route
                path={PATHS.ADMIN_MAIN.path}
                element={
                  <ProtectedRoute roles={["admin", "superadmin"]}>
                    <Views.AdminMain />
                  </ProtectedRoute>
                }
              >
                <Route path={PATHS.ADMIN_VIEW.DASHBOARD.path} element={<Views.Dashboard />} />
                <Route path={PATHS.ADMIN_VIEW.NOTIFICATION.path} element={<Views.Notifications />} />

                {/* Room Management */}
                <Route path={PATHS.ROOM_MGNT.VIEW.path} element={<Views.ViewRooms />} />
                <Route path={PATHS.ROOM_MGNT.ADD.path} element={<Views.AddRoom />} />
                <Route path={PATHS.ROOM_MGNT.EDIT.path} element={<Views.EditRoom />} />
                <Route path={PATHS.ROOM_MGNT.DELETE.path} element={<Views.DeleteRoom />} />
                <Route path={PATHS.ROOM_MGNT.DETAIL.path} element={<Views.ViewRoomDetails />} />

                {/* Booking Management */}
                <Route path={PATHS.BOOKING_MGNT.VIEW.path} element={<Views.ViewBookings />} />
                <Route path={PATHS.BOOKING_MGNT.ADD.path} element={<Views.CreateBooking />} />
                <Route path={PATHS.BOOKING_MGNT.EDIT.path} element={<Views.EditBooking />} />
                <Route path={PATHS.BOOKING_MGNT.CANCEL.path} element={<Views.CancelBooking />} />
                <Route path={PATHS.BOOKING_MGNT.DETAIL.path} element={<Views.ViewBookingDetails />} />

                {/* Logs */}
                <Route path={PATHS.LOGS.ROOMS.path} element={<Views.RoomLogs />} />
                <Route path={PATHS.LOGS.BOOKINGS.path} element={<Views.BookingLogs />} />

                {/* User Management */}
                <Route path={PATHS.USER_MGNT.VIEW.path} element={<Views.ViewUsers />} />
                <Route path={PATHS.USER_MGNT.EDIT.path} element={<Views.EditUser />} />

                {/* Admin Management */}
                <Route path={PATHS.ADMIN_MGNT.VIEW.path} element={<Views.ViewAdmins />} />
                <Route path={PATHS.ADMIN_MGNT.EDIT.path} element={<Views.EditAdmin />} />
              </Route>

              {/* User Routes */}
              <Route
                path={PATHS.USER_MAIN.path}
                element={
                  <ProtectedRoute roles={["user"]}>
                    <Views.UserMain />
                  </ProtectedRoute>
                }
              >
                <Route path={PATHS.USER_VIEW.HOME.path} element={<Views.Home />} />
                <Route path={PATHS.USER_VIEW.ROOM_EXPLORER.path} element={<Views.RoomExplorer />} />
                <Route path={PATHS.USER_VIEW.BOOKINGS.path} element={<Views.MyBookings />} />
                <Route path={PATHS.USER_VIEW.BOOK.path} element={<Views.BookRoom />} />
                <Route path={PATHS.USER_VIEW.EDIT.path} element={<Views.EditBookedRoom />} />
                <Route path={PATHS.USER_VIEW.SETTINGS.path} element={<Views.Settings />} />
              </Route>

              {/* Public Routes */}
              <Route path={PATHS.LOGIN.path} element={<Views.Login />} />
              <Route path={PATHS.SIGNUP.path} element={<Views.Signup />} />
              <Route path={PATHS.LOGOUT.path} element={<Views.Logout />} />
              <Route path={PATHS.FORGOT_PASS.path} element={<Views.ForgotPassword />} />
              <Route path={PATHS.RESET_PASS.path} element={<Views.ResetPassword />} />
              <Route path={PATHS.NOT_FOUND.path} element={<Views.NotFound />} />
            </Routes>
          </AdminProvider>
        </RoomProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};