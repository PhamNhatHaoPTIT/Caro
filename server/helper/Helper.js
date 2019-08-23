const githubUsernNameRegex = require('github-username-regex');

const isUserNameAndPassword = (string) => {
    return githubUsernNameRegex.test(string);
}

const isImage = (url) => {
    regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    return regex.test(url);
}


// Kiem tra thang thua khi nguoi choi danh nuoc moi tren ban co
// Kiểm tra theo phương ngang từ vị trí hiện tại đi sang trái và
// sang phải đếm xem có đủ 5 quân cùng giá trị thì trả về true
const checkHorizontal = (matrix, curRow, curCol, value) => {
    // di sang ben trai
    let countLeft = 0;
    let countRight = 0;
    // Di sang phia ben trai so voi vi tri hien tai
    for (let i = curCol; i >= 0; i--) {
        if (matrix[curRow][i] === value) {
            countLeft++;
        }
        else {
            break;
        }
    }
    // Di sang phia ben phai so voi vi tri hien tai
    for (let j = curCol + 1; j < 10; j++) {
        if (matrix[curRow][j] === value) {
            countRight++;
        }
        else {
            break;
        }
    }
    if (countRight + countLeft >= 5) {
        return 1;
    }
}
// Đếm số điểm theo phương thẳng đứng theo 2 hướng từ điểm hiên tại đi thẳng lên trên và
// đi xuống dưới nếu cả 2 phía trên và dưới
// tổng số ô cùng màu >=5 thì trả về giá trị true tức là chiến thắng
const checkVertically = (matrix, curRow, curCol, value) => {
    let i = curRow;
    let countUp = 0;
    let countDown = 0;
    for (let k = curRow; k < 10; k++) {
        if (matrix[k][curCol] === value)
            countDown++;
        else break;
    }
    for (let h = curRow - 1; h >= 0; h--) {
        if (matrix[h][curCol] === value)
            countUp++;
        else break;
    }

    if ((countUp + countDown >= 5))
        return 1;
}
// Kiểm tra theo phương đường chéo phụ
const checkDiagonal = (matrix, curRow, curCol, value) => {
    // kiểm tra theo phương đường chéo phía trên bên phải so với vị trí quân hiện tại
    let countRightUp = 0;
    let countLeftDown = 0;
    let temp1 = 0;
    let temp2 = 1;
    for (let i = curRow; i >= 0; i--) {
        if (matrix[i][curCol + temp1] === value) {
            countRightUp++;
            temp1++;
        }
        else break;
    }
    // kiểm tra theo phương đường chéo phía dưới bên trái so với vị trí quân hiện tại
    for (let j = curRow + 1; j < 10; j++) {
        if (matrix[j][curCol - temp2] === value) {
            countLeftDown++;
            temp2++;
        }
        else break;
    }

    if (countRightUp + countLeftDown >= 5)
        return 1;
}

const create_matrix = function (n, init) {
    let mat = [];
    for (let i = 0; i < n; i++) {
        a = [];
        for (let j = 0; j < n; j++) {
            a[j] = init;
        }
        mat[i] = a;
    }
    return mat;
}



// Kiểm tra theo phương đường chéo chính
const checkMainDiagonal = (matrix, curRow, curCol, value) => {
    let countRightDown = 0;
    let countLeftUp = 0;
    let temp1 = 0;
    let temp2 = 1;
    // Kiểm tra theo phương đường chéo chính phía trên bên trái so với vị trí quân hiện tại
    for (let i = curRow; i >= 0; i--) {
        if (matrix[i][curCol - temp1] === value) {
            countLeftUp++;
            temp1++;
        }
        else break;
    }
    // Kiểm tra theo phương đường chéo chính phía dưới bên phải so với vị trí quân hiện tại
    for (let j = curRow + 1; j < 10; j++) {
        if (matrix[j][curCol + temp2] === value) {
            countRightDown++;
            temp2++;
        }
        else break;
    }
    if (countRightDown + countLeftUp >= 5)
        return 1
}
// Ket thuc kiem tra

module.exports = {
    isUserNameAndPassword,
    isImage,
    checkHorizontal,
    checkVertically,
    checkMainDiagonal,
    checkDiagonal,
    create_matrix
}