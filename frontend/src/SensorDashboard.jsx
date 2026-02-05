import { useEffect, useState } from "react";

export default function SensorDashboard() {
    const [temperature, setTemperature] = useState("--");
    const [humidity, setHumidity] = useState("--");

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3000/api/sensor?t=" + Date.now(), // 🔥 prevent cache
                    { cache: "no-store" }
                );

                const data = await res.json();

                // Force update only if changed (optional but clean)
                setTemperature(prev => data.temperature !== prev ? data.temperature : prev);
                setHumidity(prev => data.humidity !== prev ? data.humidity : prev);

            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        getData(); // run immediately
        const interval = setInterval(getData, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            <h1>ESP8266 Sensor Data</h1>

            <div style={styles.card}>
                <h2>Temperature</h2>
                <p>{temperature} °C</p>
            </div>

            <div style={styles.card}>
                <h2>Humidity</h2>
                <p>{humidity} %</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "Arial",
        textAlign: "center",
        marginTop: "50px",
    },
    card: {
        display: "inline-block",
        padding: "20px",
        border: "1px solid #000",
        margin: "10px",
        width: "200px",
    },
};
