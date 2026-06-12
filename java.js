// 2. إرسال الطلب إلى Google Sheets
async function handleOrderSubmit(event) {
    event.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.innerText = "جاري الإرسال...";
    btn.disabled = true;

    try {
        const selectedMaterial = document.querySelector('input[name="material_type"]:checked').value;
        const price = selectedMaterial === 'inox' ? 2700 : 4000;

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            wilaya: document.getElementById('wilaya').value,
            address: document.getElementById('address').value,
            material: selectedMaterial === 'inox' ? 'Inox' : 'Silver',
            price: price
        };

        // ضع الرابط الذي حصلت عليه من جوجل هنا بين العلامتين
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzciKTvxIhoql-EfsvRIRmBdFEI1Cio61RZHMMwCgUDpTJstparcx_snloutX4dbHK_Hw/exec';

        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        // نجاح
        document.getElementById('successModal').classList.add('open');
        btn.innerText = "تم الطلب بنجاح";

    } catch (err) {
        console.error("خطأ:", err);
        alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.");
        btn.innerText = "تأكيد الشراء الفوري";
        btn.disabled = false;
    }
}

// 3. تحديث السعر
function updatePrice(amount) {
    const priceDisplay = document.getElementById('dynamic-price');
    const submitBtn = document.getElementById('submit-btn');

    if (priceDisplay) {
        priceDisplay.innerHTML = amount + ' <span>DA</span>';
    }

    if (submitBtn) {
        submitBtn.innerText = 'تأكيد الشراء الفوري بـ ' + amount + ' DA 🛒';
    }
}

// 4. radio change
document.querySelectorAll('input[name="material_type"]').forEach(radio => {
    radio.addEventListener('change', function () {
        updatePrice(this.value === 'inox' ? 2700 : 4000);
    });
});

// 5. close modal
function closeModal() {
    document.getElementById('successModal').classList.remove('open');
    document.getElementById('pearlOrderForm').reset();
    updatePrice(2700);
}

// 6. FAQ
document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', function () {
        const item = this.parentElement;
        const content = item.querySelector('.faq-content');
        const isOpen = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.faq-content').style.maxHeight = null;
        });

        if (!isOpen) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});
