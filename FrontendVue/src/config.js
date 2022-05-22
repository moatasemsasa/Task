let config;

if (process.env.NODE_ENV === "production") {
    config = {
        $api_url: "https://localhost:44391/",
        timeoutDuration: 30000,
        someOtherProps: "xyz",
    };
} else {
    config = {
        $api_url: "https://localhost:44391",
        timeoutDuration: 1000,
        someOtherProps: "abc",
    };
}

export { config };
