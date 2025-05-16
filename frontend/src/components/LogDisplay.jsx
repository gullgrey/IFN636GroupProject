import React from 'react';

const LogDisplay = ({ logs, logLevel, isLoading, error }) => {
    if (isLoading) {
        return <p className="tect-center text-gray-500 mt-4">Loading activity log...</p>;
    }
    if (error) {
        return <p className="tect-center text-gray-500 mt-4">Error loading activity log: {error}</p>;
    }
    if (!logs || logs.length === 0) {
        return <p className="tect-center text-gray-500 mt-4">No recent activity log to display.</p>;
    }

    return (
        <div className="mt-6 bg-gray-50 p-4 shadow-inner rounded">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Activity Log</h3>
            <p className="text-sm text-gray-600 mb-1">
                Current Log Level: <span className="font-medium">{logLevel || 'N/A'}</span>
            </p>
            <p classname="text-sm text-gray-600 mb-3">
                Displaying Last {logCount || logs.length} entries:
            </p>
            <pre className="bg-gray-800 text-white p-3 rounded text-xs overflow-x-auto max-h-96 leading-relaxed">
                {logs.join('\n')}
            </pre>
        </div>
    );
};

export default LogDisplay;