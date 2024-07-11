import Chart from 'chart.js/auto';
import { useOrdersStore } from '../store/ordersStore';
export default function Stadistic(localities: any) {
    const getLocalities = useOrdersStore((state) => state.getLocalities);
    const getOrders = useOrdersStore((state) => state.getOrders);
    (async function() {
        const orders = await getOrders();
        const localities = await getLocalities() || [];
        const chartData:any[] = [

        ];
        localities.map((locality: any) => {
            const dataOrigin = orders.filter((order: any) => order.shipments.locality_origin.id === locality.id)
            const dataDestination = orders.filter((order: any) => order.shipments.locality_destination.id === locality.id)
            chartData.push({locality: locality.name, origin: dataOrigin.length, destination: dataDestination.length})
        })
        const myChart = new Chart("locality_origin_destination", {
            type: "pie",
            options: {
                responsive: true,
                maintainAspectRatio: true,
            },
            data: {
                labels: chartData.map(d => d.locality),
                datasets: [{
                    label: "Origen",
                    data: chartData.map(d => d.origin),
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(153, 102, 255)",
                        "rgb(255, 159, 64)",
                        "rgb(75, 192, 192)",
                        "rgb(255, 87, 51)",
                        "rgb(101, 203, 87)",
                        "rgb(150, 150, 150)",
                        "rgb(250, 161, 76)",
                        "rgb(122, 192, 222)",
                        "rgb(201, 76, 76)",
                        "rgb(99, 99, 99)",
                        "rgb(66, 134, 244)",
                        "rgb(202, 203, 107)",
                        "rgb(255, 204, 92)",
                        "rgb(180, 198, 120)",
                        "rgb(99, 133, 245)",
                        "rgb(200, 150, 200)",
                        "rgb(140, 220, 60)",
                        "rgb(30, 120, 180)"
                    ],
                },
                {
                    label: "Destino",
                    data: chartData.map(d => d.destination),
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(153, 102, 255)",
                        "rgb(255, 159, 64)",
                        "rgb(75, 192, 192)",
                        "rgb(255, 87, 51)",
                        "rgb(101, 203, 87)",
                        "rgb(150, 150, 150)",
                        "rgb(250, 161, 76)",
                        "rgb(122, 192, 222)",
                        "rgb(201, 76, 76)",
                        "rgb(99, 99, 99)",
                        "rgb(66, 134, 244)",
                        "rgb(202, 203, 107)",
                        "rgb(255, 204, 92)",
                        "rgb(180, 198, 120)",
                        "rgb(99, 133, 245)",
                        "rgb(200, 150, 200)",
                        "rgb(140, 220, 60)",
                        "rgb(30, 120, 180)"
                    ],
                }
            ],
            }
        });
    })();
    return (
        <div className="flex flex-col items-center justify-center">
            <canvas id="locality_origin_destination"  className='w-1/2 lg:w-2/3'></canvas>
        </div>
    );
}