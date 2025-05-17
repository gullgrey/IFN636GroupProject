const NotificationDisplay = ({ notifications, isLoading, error }) => {
  if (isLoading) {
    return (
      <p className="tect-center text-gray-500 mt-4">
        Loading book notifications...
      </p>
    );
  }
  if (error) {
    return (
      <p className="tect-center text-gray-500 mt-4">
        Error loading book notifications: {error}
      </p>
    );
  }
  if (!notifications || notifications.length === 0) {
    return (
      <p className="tect-center text-gray-500 mt-4">
        No recent changes to books in the library.
      </p>
    );
  }

  return (
    <div className="mt-6 bg-gray-50 p-4 shadow-inner rounded">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Recent Book Notifications
      </h3>
      <p classname="text-sm text-gray-600 mb-3">
        Displaying the last {notifications.length} updates:
      </p>
      <pre className="bg-gray-800 text-white p-3 rounded text-xs overflow-x-auto max-h-96 leading-relaxed">
        <div>
          {notifications.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </pre>
    </div>
  );
};

export default NotificationDisplay;
