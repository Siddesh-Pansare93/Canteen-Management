const HowItWorks = () => {
    const steps = [
      {
        number: 1,
        title: "Browse & Order",
        desc: "Explore our menu and place your order with just a few clicks",
      },
      {
        number: 2,
        title: "Track Preparation",
        desc: "Get real-time updates on your order status",
      },
      {
        number: 3,
        title: "Collect & Enjoy",
        desc: "Get notified when your order is ready and enjoy your meal",
      },
    ];
  
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* How It Works */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-agnel-dark mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {steps.map((step) => (
              <div key={step.number} className="space-y-4">
                <div className="flex justify-center">
                  <span className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-agnel-dark">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Get Started */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-agnel-dark mb-6">
            Get Started Today
          </h2>
          <h3 className="text-xl sm:text-2xl text-agnel-dark mb-6">Order from our delicious menu, featuring a wide variety of freshly prepared meals, snacks, and beverages made to satisfy every craving!</h3>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  