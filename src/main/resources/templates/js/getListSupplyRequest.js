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

  data.forEach((item) => {
    // Only process items with status "Chưa duyệt"
    if (item.status === "Chưa duyệt") {
      const row = document.createElement("tr");

      // Xử lý các trường có thể null
      const requestId = item.requestId ?? "";
      const departmentName = item.department
        ? item.department.departmentName
        : "";
      const createdBy = item.createdBy ? item.createdBy.name : "";
      const status = item.status ?? "";

      // Xử lý createdDate
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
  // Giả sử dateTimeStr có định dạng từ API, ví dụ "2024-06-01T00:00:00.000+00:00"
  const dateTime = new Date(dateTimeStr); // Chuyển chuỗi thành đối tượng Date

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
  const url = `../gdbv/approveDeviceSupplyRequestDetail.html?requestId=${encodeURIComponent(
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
