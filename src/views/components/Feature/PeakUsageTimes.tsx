import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const data = {
    datasets: [
        {
            data: [
                { x: 8, y: 30 },
                { x: 8.5, y: 38 },
                { x: 9, y: 45 },
                { x: 9.3, y: 50 },
                { x: 10, y: 60 },
                { x: 10.7, y: 55 },
            ],
            backgroundColor: '#2563EB',
        },
        {
            data: [
                { x: 11, y: 80 },
                { x: 11.2, y: 82 },
                { x: 11.8, y: 85 },
                { x: 12, y: 90 },
                { x: 12.5, y: 88 },
            ],
            backgroundColor: '#10B981',
        },
        {
            data: [
                { x: 13, y: 85 },
                { x: 13.4, y: 75 },
                { x: 13.8, y: 78 },
                { x: 14, y: 70 },
                { x: 14.6, y: 72 },
            ],
            backgroundColor: '#F59E0B',
        },
        {
            data: [
                { x: 15, y: 65 },
                { x: 15.3, y: 60 },
                { x: 15.7, y: 62 },
                { x: 16, y: 50 },
                { x: 16.5, y: 55 },
            ],
            backgroundColor: '#EF4444',
        },
        {
            data: [
                { x: 17, y: 40 },
                { x: 17.2, y: 45 },
                { x: 17.8, y: 43 },
            ],
            backgroundColor: '#1E40AF',
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Peak Usage Times',
            align: "center" as const,
            color: '#1F2937',
            font: {
                weight: 'bold' as const,
                size: 16,
            },
            padding: {
                bottom: 24,
            },
        },
    },
    scales: {
        x: {
            type: 'linear' as const,
            title: { display: true, text: 'Time of Day (Hour)', color: '#1F2937',
            font: {
                weight: 'bold' as const,
                size: 12,
            }, },
            min: 8,
            max: 18,
            ticks: {
                callback: function(
                    this: import('chart.js').Scale<import('chart.js').CoreScaleOptions>,
                    tickValue: string | number
                ) {
                    return `${tickValue}:00`;
                },
                stepSize: 1,
            },
        },
        y: {
            title: { display: true, text: 'Occupancy Rate (%)',color: '#1F2937',
            font: {
                weight: 'bold' as const,
                size: 12,
            }, },
            min: 0,
            max: 100,
        },
    },
};

const PeakUsageTimes: React.FC = () => {
    return (
        <div className="h-full w-60 flex gap-2">
            <Scatter data={data} options={options} />
        </div>
    );
};

export default PeakUsageTimes;
