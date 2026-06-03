
const supabaseClient = supabase.createClient(
    'https://vjytibajskirtnvvvtpf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeXRpYmFqc2tpcnRudnZ2dHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzg3MzIsImV4cCI6MjA5NTgxNDczMn0.YWXMgZWheyq5VVEOGY4PGiyT_HwWLF1Ld4Zdmph7uAU'
);
// 2. إرسال الطلب
async function handleOrderSubmit(event) {
    event.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.innerText = "جاري الإرسال...";
    btn.disabled = true;

    try {
        // المادة والسعر
        const selectedMaterial = document.querySelector('input[name="material_type"]:checked').value;
        const price = selectedMaterial === 'inox' ? 2700 : 4000;

        // البيانات
        const formData = {
            name: document.getElementById('name').value + " (" + new Date().getTime() + ")",
            phone: document.getElementById('phone').value,
            wilaya: document.getElementById('wilaya').value,
            address: document.getElementById('address').value,
            material: selectedMaterial === 'inox' ? 'Inox' : 'Silver',
            price: price,

        };

        // إرسال
        const { error } = await supabaseClient
            .from('orders')
            .insert([formData]);

        if (error) throw error;

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

// 4. radio change (مرة واحدة فقط)
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
