async function convertToBitcoin() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;

    if (amount === "") {
        alert("يرجى إدخال المبلغ!");
        return;
    }

    // استخدام API للحصول على سعر البيتكوين مقابل العملة المختارة
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${fromCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // التأكد من أن العملة المدخلة مدعومة
        if (data.bitcoin && data.bitcoin[fromCurrency.toLowerCase()]) {
            const bitcoinPrice = data.bitcoin[fromCurrency.toLowerCase()];
            const bitcoinAmount = (amount / bitcoinPrice).toFixed(8); // دقة 8 أرقام بعد الفاصلة للبيتكوين
            document.getElementById("result").textContent = `النتيجة: ${amount} ${fromCurrency} = ${bitcoinAmount} BTC`;
        } else {
            document.getElementById("result").textContent = "هذه العملة غير مدعومة للتحويل إلى بيتكوين.";
        }
    } catch (error) {
        document.getElementById("result").textContent = "حدث خطأ. حاول مرة أخرى.";
    }
}
