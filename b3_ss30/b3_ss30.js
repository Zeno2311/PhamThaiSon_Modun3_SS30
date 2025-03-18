let phones = [];

let cart = [];

let menu = `
-----------===----QUẢN LÝ CỬA HÀNG ĐIỆN THOẠI----===-----------
1. Hiển thị danh sách điện thoại theo hãng
2. Thêm điện thoại mới vào cửa hàng
3. Tìm kiếm điện thoại theo tên hoặc id
4. Mua điện thoại
5. Thoát chương trình
---------------------------------------------------------------
~ Lựa chọn thao tác của bạn:
---------------------------------------------------------------
`;

let choice;
while (choice !== 5) {
    choice = +prompt(menu);
    switch (choice) {
        case 1: // Hiển thị theo hãng
            displayPhonesByCompany();
            break;
        case 2: // Thêm điện thoại mới
            addNewPhone();
            break;
        case 3: // Tìm kiếm điện thoại
            searchPhone();
            break;
        case 4: // Mua điện thoại
            purchasePhone();
            break;
        case 5: // Thoát
            alert("Cảm ơn bạn đã sử dụng chương trình!");
            break;
        default:
            alert("Lựa chọn không hợp lệ!");
            break;
    }
}

function displayPhonesByCompany() {
    let company = prompt("Nhập hãng điện thoại muốn xem (Samsung, Apple, Xiaomi...):");
    let foundPhones = [];
    for (let i = 0; i < phones.length; i++) {
        if (company.toLowerCase() === phones[i].company.toLowerCase()) {
            foundPhones.push(phones[i]);
        }
    }
    if (foundPhones.length === 0) {
        alert("Không tìm thấy điện thoại của hãng này!");
    } else {
        console.table(foundPhones);
    }
}

function addNewPhone() {
    let id = Math.ceil(Math.random() * 1000);
    for (let i = 0; i < phones.length; i++) {
        if (phones[i].id === id) {
            alert("Mã điện thoại đã tồn tại!");
            return;
        }
    }
    let name = prompt("Nhập tên điện thoại:");
    let price = +prompt("Nhập giá điện thoại:");
    let quantity = +prompt("Nhập số lượng:");
    let company = prompt("Nhập hãng điện thoại:");
    if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
        alert("Giá hoặc số lượng không hợp lệ!");
        return;
    }
    phones.push({
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        company: company
    });
    alert("Thêm điện thoại thành công!");
}

function searchPhone() {
    let searchType = prompt("Tìm theo (1) ID hoặc (2) Tên điện thoại? (Nhập 1 hoặc 2)");
    if (searchType === "1") {
        let id = +prompt("Nhập ID điện thoại cần tìm:");
        for (let i = 0; i < phones.length; i++) {
            if (phones[i].id === id) {
                console.table([phones[i]]);
                return;
            }
        }
        alert("Không tìm thấy điện thoại!");
    } else if (searchType === "2") {
        let name = prompt("Nhập tên điện thoại cần tìm:");
        let foundPhones = [];
        for (let i = 0; i < phones.length; i++) {
            if (phones[i].name.toLowerCase().includes(name.toLowerCase())) {
                foundPhones.push(phones[i]);
            }
        }
        if (foundPhones.length > 0) {
            console.table(foundPhones);
        } else {
            alert("Không tìm thấy điện thoại!");
        }
    } else {
        alert("Lựa chọn không hợp lệ!");
    }
}

function purchasePhone() {
    let id = +prompt("Nhập ID điện thoại muốn mua:");
    let phoneIndex = -1;
    for (let i = 0; i < phones.length; i++) {
        if (phones[i].id === id) {
            phoneIndex = i;
            break;
        }
    }

    if (phoneIndex === -1) {
        alert("Không tìm thấy điện thoại!");
        return;
    }

    let phone = phones[phoneIndex];
    if (phone.quantity <= 0) {
        alert("Điện thoại đã hết hàng!");
        return;
    }

    let quantity = +prompt("Nhập số lượng muốn mua:");
    if (isNaN(quantity) || quantity <= 0 || quantity > phone.quantity) {
        alert(`Số lượng không hợp lệ! Hiện chỉ còn ${phone.quantity} chiếc`);
        return;
    }

    let confirmPurchase = confirm(`
        Xác nhận mua:
        Tên điện thoại: ${phone.name}
        Số lượng: ${quantity}
        Tổng tiền: ${phone.price * quantity} VNĐ
    `);

    if (confirmPurchase) {
        phone.quantity -= quantity;
        cart.push({
            id: phone.id,
            name: phone.name,
            price: phone.price,
            quantity: quantity,
            company: phone.company
        });
        alert("Mua điện thoại thành công!");
    }
}