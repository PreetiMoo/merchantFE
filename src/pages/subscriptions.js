import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subscription() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [accessToken, setToken] = useState("");

    useEffect(() => {
        fetchData();

        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const fetchData = async () => {
        try {
            const storedToken = localStorage.getItem("accessToken");
            const subscriptionResponse = await axios.get(
                "http://localhost:8000/subscriptions/merchant/get",
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            console.log("Subscription Response:", subscriptionResponse.data); // Log the subscriptions received
            setSubscriptions(subscriptionResponse.data);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    };

    return (
        <div className="container">
            <h1>Subscriptions</h1>
            <div className="row">
                {subscriptions.map(subscription => (
                    <div key={subscription.id} className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Subscription ID: {subscription.id}</h5>
                                <p className="card-text">Customer ID: {subscription.cust_id}</p>
                                <p className="card-text">Plan ID: {subscription.plan_id}</p>
                                <p className="card-text">Start Time: {subscription.start_time}</p>
                                <p className="card-text">End Time: {subscription.end_time}</p>
                                <p className="card-text">Merchant ID: {subscription.merchant_id}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subscription;
