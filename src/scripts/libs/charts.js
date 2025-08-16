import ApexCharts from "apexcharts";
window.ApexCharts = ApexCharts;
window.renderChart= (chartId) => {
    const chartElement = document.getElementById(chartId);
    const chartConfig = chartElement.dataset.config;
    const chart = new ApexCharts(document.querySelector("#" + chartId), JSON.parse(chartConfig));
    chart.render();
    return chart;
}