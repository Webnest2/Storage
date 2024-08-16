// تحميل المنتجات من LocalStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products;
}

// حفظ المنتجات في LocalStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// دالة لإضافة منتج جديد
function addProduct() {
    const type = document.getElementById('productType').value;
    const category = document.getElementById('productCategory').value;
    const total = document.getElementById('productTotal').value;
    const available = document.getElementById('productAvailable').value;
    const sold = document.getElementById('productSold').value;

    if (type === '' || category === '' || total === '' || available === '' || sold === '') {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const product = {
        id: Date.now(), // إنشاء معرف فريد للمنتج باستخدام التاريخ الحالي
        type,
        category,
        total: Number(total),
        available: Number(available),
        sold: Number(sold)
    };

    const products = loadProducts();
    products.push(product);
    saveProducts(products);

    clearForm();
    displayProducts();
}

// دالة لعرض المنتجات
function displayProducts() {
    const products = loadProducts();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${product.type}</strong> - ${product.category}<br>
            العدد الكلي: ${product.total}, العدد الموجود: ${product.available}, العدد المباع: ${product.sold} 
            <button onclick="deleteProduct(${product.id})">حذف</button>
        `;
        productList.appendChild(li);
    });
}

// دالة لحذف منتج
function deleteProduct(id) {
    const products = loadProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    saveProducts(filteredProducts);
    displayProducts();
}

// دالة لمسح الحقول بعد إضافة منتج
function clearForm() {
    document.getElementById('productType').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productTotal').value = '';
    document.getElementById('productAvailable').value = '';
    document.getElementById('productSold').value = '';
}

// عرض المنتجات عند تحميل الصفحة
window.onload = displayProducts;