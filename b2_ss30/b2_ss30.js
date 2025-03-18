let books = [
    {
        id: 1,
        name: "Dế Mèn Phiêu Lưu Ký",
        price: 50000,
        quantity: 15,
        category: "Văn học thiếu nhi"
    },
    {
        id: 2,
        name: "Nhật Ký Trong Tù",
        price: 80000,
        quantity: 10,
        category: "Thơ"
    },
    {
        id: 3,
        name: "Truyện Kiều",
        price: 65000,
        quantity: 20,
        category: "Thơ"
    },
    {
        id: 4,
        name: "Harry Potter",
        price: 120000,
        quantity: 8,
        category: "Văn học thiếu nhi"
    }
];

let cart = [];

let menu = `
-----------===----QUẢN LÝ SÁCH----===-----------
1. Hiển thị danh sách sách theo thể loại
2. Thêm sách mới vào kho
3. Tìm kiếm sách theo tên hoặc id
4. Mua sách
5. Sắp xếp sách theo giá:
   a. Tăng dần
   b. Giảm dần
6. Tính tổng số lượng sách đã mua và tổng tiền
7. Hiển thị tổng số lượng sách trong kho
8. Thoát chương trình
------------------------------------------------
~ Lựa chọn thao tác của bạn:
------------------------------------------------
`;

let choice;
while (choice !== 8) {
    choice = +prompt(menu);
    switch (choice) {
        case 1: // Hiển thị theo thể loại
            displayBooksByCategory();
            break;
        case 2: // Thêm sách mới
            addNewBook();
            break;
        case 3: // Tìm kiếm sách
            searchBook();
            break;
        case 4: // Mua sách
            purchaseBook();
            break;
        case 5: // Sắp xếp theo giá
            sortBooks();
            break;
        case 6: // Tính tổng giỏ hàng
            calculateCartTotal();
            break;
        case 7: // Tổng số lượng sách trong kho
            displayTotalStock();
            break;
        case 8: // Thoát
            alert("Cảm ơn bạn đã sử dụng chương trình!");
            break;
        default:
            alert("Lựa chọn không hợp lệ!");
            break;
    }
}

function displayBooksByCategory() {
    let categoryBook = prompt("Nhập thể loại sách muốn xem:");
    let foundBooks = [];
    for (let i = 0; i < books.length; i++) {
        if (categoryBook.toLowerCase() === books[i].category.toLowerCase()) {
            foundBooks.push(books[i]);
        }
    }
    if (foundBooks.length === 0) {
        alert("Không tồn tại");
    } else {
        console.table(foundBooks);
    }
}

function addNewBook() {
    let id = Math.ceil(Math.random() * 10000);
    let name = prompt("Nhập tên sách:");
    let price = +prompt("Nhập giá sách:");
    let quantity = +prompt("Nhập số lượng:");
    let category = prompt("Nhập thể loại sách:");

    if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
        alert("Giá hoặc số lượng không hợp lệ!");
        return;
    }

    books.push({
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        category: category
    });
    alert("Thêm sách thành công!");
}

function searchBook() {
    let searchType = prompt("Tìm theo (1) ID hoặc (2) Tên sách? (Nhập 1 hoặc 2)");
    if (searchType === "1") {
        let id = +prompt("Nhập ID sách cần tìm:");
        for (let i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                console.table([books[i]]);
                return;
            }
        }
        alert("Không tìm thấy sách!");
    } else if (searchType === "2") {
        let name = prompt("Nhập tên sách cần tìm:");
        let foundBooks = [];
        for (let i = 0; i < books.length; i++) {
            if (books[i].name.toLowerCase().includes(name.toLowerCase())) {
                foundBooks.push(books[i]);
            }
        }
        if (foundBooks.length > 0) {
            console.table(foundBooks);
        } else {
            alert("Không tìm thấy sách!");
        }
    } else {
        alert("Lựa chọn không hợp lệ!");
    }
}

function purchaseBook() {
    let id = +prompt("Nhập ID sách muốn mua:");
    let bookIndex = -1;
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            bookIndex = i;
            break;
        }
    }
    if (bookIndex === -1) {
        alert("Không tìm thấy sách!");
        return;
    }
    let book = books[bookIndex];
    if (book.quantity <= 0) {
        alert("Sách đã hết hàng!");
        return;
    }
    let quantity = +prompt("Nhập số lượng muốn mua:");
    if (isNaN(quantity) || quantity <= 0 || quantity > book.quantity) {
        alert(`Số lượng không hợp lệ! Hiện chỉ còn ${book.quantity} cuốn`);
        return;
    }
    let confirmPurchase = confirm(`
        Xác nhận mua:
        Tên sách: ${book.name}
        Số lượng: ${quantity}
        Tổng tiền: ${book.price * quantity} VNĐ
    `);
    if (confirmPurchase) {
        book.quantity -= quantity;
        cart.push({
            id: book.id,
            name: book.name,
            price: book.price,
            quantity: quantity
        });
        alert("Mua sách thành công!");
    }
}

function sortBooks() {
    let sortType = prompt("Nhập 'a' để tăng dần, 'b' để giảm dần:");
    for (let i = 0; i < books.length - 1; i++) {
        for (let j = 0; j < books.length - i - 1; j++) {
            let shouldSwap;
            if (sortType === 'a') {
                shouldSwap = books[j].price > books[j + 1].price;
            } else if (sortType === 'b') {
                shouldSwap = books[j].price < books[j + 1].price;
            } else {
                alert("Lựa chọn không hợp lệ!");
                return;
            }
            if (shouldSwap) {
                let temp = books[j];
                books[j] = books[j + 1];
                books[j + 1] = temp;
            }
        }
    }
    if (sortType === 'a' || sortType === 'b') {
        console.table(books);
        alert(`Đã sắp xếp ${sortType === 'a' ? 'tăng' : 'giảm'} dần`);
    }
}

function calculateCartTotal() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalQuantity += cart[i].quantity;
        totalPrice += cart[i].price * cart[i].quantity;
    }
    console.table(cart);
    alert(`
        Tổng số lượng sách đã mua: ${totalQuantity}
        Tổng tiền: ${totalPrice} VNĐ
        `);
}

function displayTotalStock() {
    let total = 0;
    for (let i = 0; i < books.length; i++) {
        total += books[i].quantity;
    }
    alert(`Tổng số lượng sách trong kho: ${total} cuốn`);
    console.table(books);
}