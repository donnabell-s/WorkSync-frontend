import React, { useState } from "react";

const AccountPreferences: React.FC = () => {
  const [emailConfirmation, setEmailConfirmation] = useState(false);
  const [cancellationNotification, setCancellationNotification] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderType, setReminderType] = useState("Notification");
  const [reminderTime, setReminderTime] = useState(10);
  const [reminderUnit, setReminderUnit] = useState("minutes");
  const [defaultDuration, setDefaultDuration] = useState("1 hour");

  return (
    <div className="bg-white rounded-md shadow-md w-full h-full p-6">
  <h1 className="text-2xl font-semibold border-b border-[#8E939A] pb-4 mb-4">Preferences</h1>

      {/* Notification Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Notification Settings</h2>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  id="emailConfirmation"
                  type="checkbox"
                  className="accent-purple-600"
                  checked={emailConfirmation}
                  onChange={() => setEmailConfirmation(!emailConfirmation)}
                />
                <label htmlFor="emailConfirmation">Send email confirmation</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="cancellationNotification"
                  type="checkbox"
                  className="accent-purple-600"
                  checked={cancellationNotification}
                  onChange={() => setCancellationNotification(!cancellationNotification)}
                />
                <label htmlFor="cancellationNotification">
                  Notify when bookings are cancelled
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="remindersEnabled"
                  type="checkbox"
                  className="accent-purple-600"
                  checked={remindersEnabled}
                  onChange={() => setRemindersEnabled(!remindersEnabled)}
                />
                <label htmlFor="remindersEnabled">Enable reminders</label>
              </div>

              {remindersEnabled && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-3">
                  <select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value)}
                    className="border px-3 py-1 rounded-md"
                  >
                    <option value="Notification">Notification</option>
                    <option value="Email">Email</option>
                  </select>

                  <input
                    type="number"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(Number(e.target.value))}
                    className="w-28 border px-2 py-1 rounded-md"
                  />

                  <select
                    value={reminderUnit}
                    onChange={(e) => setReminderUnit(e.target.value)}
                    className="border px-3 py-1 rounded-md"
                  >
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                  </select>
                </div>
              )}
            </div>
          </div>

      {/* Booking Defaults */}
      <div>
  <div className="border-t border-[#8E939A] mb-3" />
        <h2 className="text-lg font-semibold mb-3">Booking Defaults</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-3">
          <label htmlFor="defaultDuration" className="whitespace-nowrap">
            Default Duration
          </label>
          <select
            id="defaultDuration"
            value={defaultDuration}
            onChange={(e) => setDefaultDuration(e.target.value)}
            className="border px-3 py-1 rounded-md"
          >
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
            <option value="12 hours">12 hours</option>
            <option value="24 hours">24 hours</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccountPreferences;