document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

function fetchData() {
  const url = "http://localhost:8080/api/getAllSupplyRequest";

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayData(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayData(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Xóa nội dung cũ của bảng trước khi thêm các dòng mới

  data.forEach((item) => {
    // Chỉ hiển thị các bản ghi có status là "đã duyệt"
    if (item.status === "Đã duyệt") {
      const row = document.createElement("tr");

      const requestId = item.requestId ?? "";
      const departmentName = item.department
        ? item.department.departmentName
        : "";
      const createdBy = item.createdBy ? item.createdBy.name : "";
      const status = item.status ?? "";
      const createdDate = item.createdDate
        ? formatDateTime(item.createdDate)
        : "";

      row.innerHTML = `
                  <td>${requestId}</td>
                  <td>${departmentName}</td>
                  <td>${createdBy}</td>
                  <td>${createdDate}</td>
                  <td>${status}</td>
                  <td><button class="detail-button" onclick="redirectToAnotherPage('${requestId}', '${departmentName}', '${createdBy}', '${createdDate}', '${status}')">Xem chi tiết</button></td>
              `;

      tableBody.appendChild(row);
    }
  });
}

function formatDateTime(dateTimeStr) {
  const dateTime = new Date(dateTimeStr);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  return dateTime.toLocaleString("en-GB", options);
}

function redirectToAnotherPage(
  requestId,
  departmentName,
  createdBy,
  createdDate,
  status
) {
  const url = `../nv/confirmSupplyDeviceDetail.html?requestId=${encodeURIComponent(
    requestId
  )}&departmentName=${encodeURIComponent(
    departmentName
  )}&createdBy=${encodeURIComponent(
    createdBy
  )}&createdDate=${encodeURIComponent(createdDate)}&status=${encodeURIComponent(
    status
  )}`;
  window.location.href = url;
}
