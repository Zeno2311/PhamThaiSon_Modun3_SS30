let products = [
    {
        id: 1,
        name: "mèn mén",
        price: 20000,
        quantity: 20,
        category: "món ăn dân tộc Mông",
    },
    {
        id: 2,
        name: "mứt",
        price: 80000,
        quantity: 21,
        category: "món ăn dân tộc Kinh",
    },
    {
        id: 3,
        name: "com lam",
        price: 40000,
        quantity: 15,
        category: "món ăn dân tộc Mông",
    },
    {
        id: 4,
        name: "bánh đậu xanh",
        price: 60000,
        quantity: 30,
        category: "món ăn dân tộc Kinh",
    }
];
let cart = []; // giỏ hàng
let menu = `
-----------===------------MENU----------===----------
 1. Hiển thị các sản phẩm theo tên danh mục.    
 2. Chọn sản phẩm để mua bằng cách nhập id sản phẩm. 
 3. Sắp xếp các sản phẩm trong cửa hàng theo giá:    
    a. Tăng dần.                                     
    b. Giảm dần.                                     
 4. Tính số tiền thanh toán trong giỏ hàng.          
 5. Thoát.                                           
----------------------------------------------------
  ~  Lựa chọn cho thao tác của bạn:                  
----------------------------------------------------
`;
let choice;
while (choice !== 5) {
    choice = +prompt(menu);
    switch (choice) {
        case 1: // Hiển thị các sản phẩm theo tên danh mục.
            displayProduct();
            break;
        case 2: // Chọn sản phẩm để mua bằng cách nhập id sản phẩm.
            purchase();
            break;
        case 3: // Sắp xếp các sản phẩm trong cửa hàng theo giá
            arrange();
            break;
        case 4: // Tính số tiền thanh toán trong giỏ hàng.
            sumCartProduct();
            break;
        case 5:// Thoát.
            alert("Cảm ơn đã tin tưởng và sử dụng !!!!");
            break;
        default:
            alert("Anh nhắc em !!!!!");
            break;
    }
};

function displayProduct() {
    let seachCategoryProduct = prompt("Nhập danh mục bạn muốn hiển thị");
    let findIndexCategoryProduct = -1;
    for (let i = 0; i < products.length; i++) {
        if (seachCategoryProduct === products[i].category) {
            findIndexCategoryProduct = i;
            console.table(products[findIndexCategoryProduct]);
        }
    }
    if (findIndexCategoryProduct === -1) {
        alert("Danh mục sản phẩm không tồn tại");
    }
};

function purchase() {
    let seachIDProduct = +prompt("Nhập Id sản phẩm bạn muốn tìm");
    let findIndexIDProduct = -1;
    for (let i = 0; i < products.length; i++) {
        if (seachIDProduct === products[i].id) {
            findIndexIDProduct = i;
            break;
        }
    }
    if (findIndexIDProduct === -1) {
        alert("Không tồn tại sản phẩm có id mà bạn nhập vào");
    } else {
        let numberProduct = +prompt("Nhập số lượng sản phẩm mà bạn muốn mua");
        if (products[findIndexIDProduct].quantity <= 0) {
            alert("Số lượng sản phẩm hiện tại không đủ");
        } else {
            let sumQuantity = products[findIndexIDProduct].quantity - numberProduct;
            if (sumQuantity <= 0) {
                alert("Số lượng hàng không đủ");
            } else {
                let confirmQuantity = confirm(`
                    Bạn có đồng ý mua ${products[findIndexIDProduct].name}
                    Số lượng trong giỏ hàng : ${numberProduct}
                    `);
                if (confirmQuantity === true) {
                    alert("Đã chốt đơn hàng thành công");
                    cart.push({
                        name: products[findIndexIDProduct].name,
                        price: products[findIndexIDProduct].price,
                        quantity: numberProduct,
                    });
                } else {
                    alert("Đã hủy đơn hàng theo yêu cầu của bạn");
                }
            }
        }
    }
}

function arrange() {
    let sortChoice = prompt("Nhập 'a' để tăng dần, 'b' để giảm dần");
    let sortedProducts = [...products];
    let n = sortedProducts.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let shouldSwap;
            if (sortChoice === 'a') {
                shouldSwap = sortedProducts[j].price > sortedProducts[j + 1].price;
            } else if (sortChoice === 'b') {
                shouldSwap = sortedProducts[j].price < sortedProducts[j + 1].price;
            } else {
                alert("Lựa chọn không hợp lệ");
                return;
            }
            if (shouldSwap) {
                let temp = sortedProducts[j];
                sortedProducts[j] = sortedProducts[j + 1];
                sortedProducts[j + 1] = temp;
            }
        }
    }
    if (sortChoice === 'a' || sortChoice === 'b') {
        console.table(sortedProducts);
    }
}

function sumCartProduct() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
    } else {
        console.table(cart);
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
        }
        alert(`Tổng số tiền cần thanh toán: ${total} VNĐ`);
    }
}