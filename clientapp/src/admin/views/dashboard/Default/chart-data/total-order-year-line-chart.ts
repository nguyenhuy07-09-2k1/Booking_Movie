// ===========================|| DASHBOARD - TOTAL ORDER YEAR CHART ||=========================== //

import { ApexOptions } from "apexcharts";



const ChartYearOptions: ApexOptions = {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#fff'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: 'Total Order'
            } as  ApexTooltipY,
            marker: {
                show: false
            }
        }
    ,
   
};

export const  seriesLineYear  = [
    {
        name: 'series1',
        data: [35, 44, 9, 54, 45, 66, 41, 69]
    }
]

export default ChartYearOptions;
