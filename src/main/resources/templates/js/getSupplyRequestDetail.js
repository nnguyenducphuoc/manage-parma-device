// Hàm lấy query parameters từ URL
function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const param of queryParams) {
    params[param[0]] = param[1];
  }
  return params;
}
function displayRequestDetails() {
  const params = getQueryParams();

  // Lấy các thông tin từ query parameters
  const requestId = params["requestId"];
  const departmentName = params["departmentName"];
  const createdBy = params["createdBy"];
  const createdDate = params["createdDate"];
  const status = params["status"];

  fetchData(requestId);

  // Hiển thị các thông tin trên giao diện
  const requestDetailsElement = document.getElementById("requestDetails");
  requestDetailsElement.innerHTML = `

        <div class="container1">
                <div class="header">
                    <span>Ngày tạo phiếu: ${createdDate}</span>
                </div>
                <h1>YÊU CẦU NHẬP THIẾT BỊ</h1>
                <div class="form-group">
                    <span>Mã phiếu nhập: ${requestId}</span>
                </div>
                <div class="form-group">
                    <span>Người thực hiện: ${createdBy}</span>
                </div>
                <div class="form-group">
                    <span>Khoa: ${departmentName}</span>
                </div>



                <form id="deviceForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="device-id">Mã thiết bị:</label>
                            <input type="text" id="device-id" value="" disabled>
                        </div>
                        <div class="form-group">
                            <label for="device-name">Tên thiết bị:</label>
                            <input type="text" id="device-name" value="" disabled>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="reason">Lý do:</label>
                            <textarea id="reason" disabled></textarea>
                        </div>
                        <div class="form-group">
                            <label for="quantity-requested">Số lượng yêu cầu:</label>
                            <input type="number" id="quantity-requested" value="" disabled>
                        </div>
                        <div class="form-group">
                            <label for="quantity-approved">Số lượng duyệt:</label>
                            <input type="number" id="quantity-approved" value="">
                        </div>
                    </div>                
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã thiết bị</th>
                                <th>Tên thiết bị</th>
                                <th>Số lượng yêu cầu</th>
                                <th>Số lượng duyệt</th>
                                <th>Lý do</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <!-- Dữ liệu sẽ được thêm bởi JavaScript -->
                        </tbody>
                    </table>
                    <div class="pagination">
                        <button>&laquo;</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&raquo;</button>
                      </div>
                    <div class="form-actions">
                        <div id="actionButtons">
                            <button type="button" id="rejectButton" style="display: none;" onclick="openRejectPopup()">Từ chối</button>
                            <button type="button" id="approveButton" style="display: none;" onclick="openApprovePopup()">Duyệt</button>
                        </div>
                    </div>
                </form>
            </div>

            <div id="rejectPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeRejectPopup()">&times;</span>
            <p>Bạn có chắc chắn muốn từ chối?</p>
            <button onclick="rejectSupplyRequest('${requestId}')">Từ chối</button>
        </div>
        </div>

        <div id="approvePopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="closeApprovePopup()">&times;</span>
            <p>Bạn có chắc chắn muốn duyệt phiếu này?</p>
            <button onclick="approveSupplyRequest('${requestId}')">Duyệt</button>
        </div>
        </div>
    `;
  // Kiểm tra status để quyết định hiển thị button
  if (status === "Từ chối" || status === "Đã duyệt") {
    // Ẩn cả hai button
    document.getElementById("approveButton").style.display = "none";
    document.getElementById("rejectButton").style.display = "none";
  } else {
    // Hiển thị button
    document.getElementById("approveButton").style.display = "inline-block";
    document.getElementById("rejectButton").style.display = "inline-block";
  }

  // Thêm sự kiện input cho input quantity-approved
  document
    .getElementById("quantity-approved")
    .addEventListener("blur", function () {
      const valueO = parseInt(
        document.getElementById("quantity-requested").value
      );
      if (parseInt(this.value) < 0 || parseInt(this.value) > valueO) {
        alert("Gía trị không hợp lệ!");
        document.getElementById("quantity-approved").value = valueO;
        return;
      }
      updateTableApprovedQuantity(this.value);
    });

  function updateTableApprovedQuantity(approvedQuantity) {
    const deviceId = document.getElementById("device-id").value;
    const tableRows = document
      .getElementById("tableBody")
      .getElementsByTagName("tr");

    // Duyệt qua từng dòng trong bảng
    for (let i = 0; i < tableRows.length; i++) {
      const rowDeviceId =
        tableRows[i].getElementsByTagName("td")[1].textContent; // Lấy mã thiết bị của dòng hiện tại

      // So sánh với mã thiết bị từ input
      if (rowDeviceId === deviceId) {
        // Cập nhật số lượng được duyệt (approvedQuantity) cho dòng này
        tableRows[i].getElementsByTagName("td")[4].textContent =
          approvedQuantity;
        break; // Dừng vòng lặp sau khi cập nhật thành công
      }
    }
  }
}

function getApprovedQuantitiesMap() {
  const tableRows = document
    .getElementById("tableBody")
    .getElementsByTagName("tr");
  const approvedQuantitiesMap = {};

  // Duyệt qua từng dòng trong bảng
  for (let i = 0; i < tableRows.length; i++) {
    const deviceId = tableRows[i]
      .getElementsByTagName("td")[1]
      .textContent.trim(); // Lấy mã thiết bị của dòng hiện tại và loại bỏ khoảng trắng
    const approvedQuantity = parseInt(
      tableRows[i].getElementsByTagName("td")[4].textContent.trim(),
      10
    ); // Lấy số lượng được duyệt của dòng hiện tại và chuyển thành số nguyên

    // Thêm vào object: key là deviceId, value là approvedQuantity
    approvedQuantitiesMap[deviceId] = approvedQuantity;
  }

  return approvedQuantitiesMap;
}
function updateApprovedQuantitiesOnServer(approvedQuantitiesMap, id) {
  const url = `http://localhost:8080/api/update-approved-quantities/${id}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(approvedQuantitiesMap),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Đọc và trả về JSON từ phản hồi
    })
    .then((data) => {
      console.log("Update successful:", data);
      // Xử lý các hành động sau khi cập nhật thành công
    })
    .catch((error) => {
      console.error("Error updating quantities:", error);
      // Xử lý lỗi nếu có
    });
}

function updateApprovedQuantitiesFromTable(id) {
  const approvedQuantitiesMap = getApprovedQuantitiesMap(); // Lấy approvedQuantitiesMap từ bảng
  updateApprovedQuantitiesOnServer(approvedQuantitiesMap, id); // Gọi hàm cập nhật lên server với approvedQuantitiesMap
}

function fetchData(id) {
  const url = `http://localhost:8080/api/supply-request-details/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((supplyRequests) => {
      let stt = 1; // Biến đếm STT
      // Duyệt qua từng yêu cầu cung cấp thiết bị
      supplyRequests.forEach((supplyRequest) => {
        // Lấy thông tin từng thiết bị cho yêu cầu này
        fetchDeviceInfo(supplyRequest.device)
          .then((deviceInfo) => {
            // Hiển thị thông tin thiết bị trong bảng
            displayDeviceRow(stt++, supplyRequest, deviceInfo);
            const row = tableBody.lastChild; // Lấy dòng vừa thêm vào (vì đã thêm từ trên xuống dưới)
            row.addEventListener("click", function () {
              fillForm(supplyRequest, deviceInfo);
            });
          })
          .catch((error) =>
            console.error("Error fetching device info:", error)
          );
      });
    })
    .catch((error) => console.error("Error fetching supply requests:", error));
}

function fetchDeviceInfo(deviceId) {
  const url = `http://localhost:8080/api/devices/${deviceId}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error(
        `Error fetching device info for device ${deviceId}:`,
        error
      );
      return {}; // Trả về một đối tượng trống nếu có lỗi
    });
}

function displayDeviceRow(stt, supplyRequest, deviceInfo) {
  if (stt === 1) {
    document.getElementById("device-id").value = deviceInfo.deviceId;
    document.getElementById("device-name").value = deviceInfo.name;
    document.getElementById("reason").value = supplyRequest.reason;
    document.getElementById("quantity-requested").value =
      supplyRequest.requestedQuantity;
    document.getElementById("quantity-approved").value =
      supplyRequest.approvedQuantity;
  }
  const tableBody = document.getElementById("tableBody");
  const row = document.createElement("tr");

  // Hiển thị thông tin từ yêu cầu cung cấp thiết bị và thông tin thiết bị
  row.innerHTML = `
  <td>${stt}</td>
      <td>${deviceInfo.deviceId}</td>
      <td>${deviceInfo.name}</td>
      <td>${supplyRequest.requestedQuantity}</td>
      <td id="quantity">${supplyRequest.approvedQuantity}</td>
      <td>${supplyRequest.reason}</td>
    `;

  tableBody.appendChild(row);
}

function fillForm(supplyRequest, deviceInfo) {
  // Đổ dữ liệu từ supplyRequest và deviceInfo vào form
  document.getElementById("device-id").value = deviceInfo.deviceId;
  document.getElementById("device-name").value = deviceInfo.name;
  document.getElementById("reason").value = supplyRequest.reason;
  document.getElementById("quantity-requested").value =
    supplyRequest.requestedQuantity;
  document.getElementById("quantity-approved").value =
    supplyRequest.approvedQuantity;
}

// JavaScript để điều khiển Popup
function openRejectPopup() {
  var popup = document.getElementById("rejectPopup");
  popup.style.display = "block";
}

function closeRejectPopup() {
  var popup = document.getElementById("rejectPopup");
  popup.style.display = "none";
}

function openApprovePopup() {
  var popup = document.getElementById("approvePopup");
  popup.style.display = "block";
}

function closeApprovePopup() {
  var popup = document.getElementById("approvePopup");
  popup.style.display = "none";
}

function rejectSupplyRequest(id) {
  // Thực hiện hành động từ chối ở đây (ví dụ: gửi yêu cầu từ chối đến server)
  // Lấy thông tin cần thiết từ row để gửi đến API
  // Gọi API để cập nhật trạng thái
  fetch(`http://localhost:8080/api/rejectSupplyRequestByRequestId/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to reject supply request");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Supply request rejected successfully:", data);
      // Thực hiện các hành động cần thiết sau khi từ chối thành công
      closeRejectPopup(); // Đóng popup sau khi xử lý thành công
    })
    .catch((error) => {
      console.error("Error rejecting supply request:", error);
      // Xử lý lỗi nếu cần thiết
    });
  closeRejectPopup(); // Đóng popup sau khi thực hiện hành động
  redirectToAnotherPage();
}

function approveSupplyRequest(id) {
  // Thực hiện hành động từ chối ở đây (ví dụ: gửi yêu cầu từ chối đến server)
  // Lấy thông tin cần thiết từ row để gửi đến API
  // Gọi API để cập nhật trạng thái
  fetch(`http://localhost:8080/api/approveSupplyRequestByRequestId/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to reject supply request");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Supply request rejected successfully:", data);
      // Thực hiện các hành động cần thiết sau khi từ chối thành công
      closeRejectPopup(); // Đóng popup sau khi xử lý thành công
    })
    .catch((error) => {
      console.error("Error rejecting supply request:", error);
      // Xử lý lỗi nếu cần thiết
    });
  updateApprovedQuantitiesFromTable(id);
  closeRejectPopup(); // Đóng popup sau khi thực hiện hành động
  redirectToAnotherPage();
}

function redirectToAnotherPage() {
  const url = "../gdbv/approveDeviceSupplyRequest.html";
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
  displayRequestDetails();
});
