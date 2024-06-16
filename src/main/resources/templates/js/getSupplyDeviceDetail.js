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
    <h1>YÊU CẦU CUNG CẤP THIẾT BỊ</h1>
    <div class="form-group">
        <span>Mã phiếu : ${requestId}</span>
    </div>
    <div class="form-group">
        <span>Người tạo: ${createdBy}</span>
    </div>
    <form>
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
                <textarea id="reason" disabled>Số lượng trong kho đã hết</textarea>
            </div>
            <div class="form-group">
                <label for="quantity-requested">Số lượng yêu cầu:</label>
                <input type="number" id="quantity-requested" value="" disabled>
            </div>
            <div class="form-group">
                <label for="quantity-approved">Số lượng duyệt:</label>
                <input type="number" id="quantity-approved" value="" disabled>
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
                            <button type="button" id="rejectButton"  onclick="redirectToAnotherPage()">Hủy</button>
                            <button type="button" id="approveButton"  onclick="openApprovePopup()">Xác nhận</button>
                        </div>
                    </div>
    </form>
</div>

  
          <div id="approvePopup" class="popup">
          <div class="popup-content">
              <span class="close" onclick="closeApprovePopup()">&times;</span>
              <p>Bạn có chắc chắn muốn xác nhận phiếu này?</p>
              <button onclick="approveSupplyRequest('${requestId}')">Xác nhận</button>
          </div>
          </div>
      `;
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
function updateApprovedQuantitiesOnServer(approvedQuantitiesMap) {
  const url = "http://localhost:8080/api/update-device-quantities";
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

function updateApprovedQuantitiesFromTable() {
  const approvedQuantitiesMap = getApprovedQuantitiesMap(); // Lấy approvedQuantitiesMap từ bảng
  updateApprovedQuantitiesOnServer(approvedQuantitiesMap); // Gọi hàm cập nhật lên server với approvedQuantitiesMap
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

function openApprovePopup() {
  var popup = document.getElementById("approvePopup");
  popup.style.display = "block";
}

function closeApprovePopup() {
  var popup = document.getElementById("approvePopup");
  popup.style.display = "none";
}

function approveSupplyRequest(id) {
  // Thực hiện hành động từ chối ở đây (ví dụ: gửi yêu cầu từ chối đến server)
  // Lấy thông tin cần thiết từ row để gửi đến API
  // Gọi API để cập nhật trạng thái
  fetch(`http://localhost:8080/api/confirmSupplyRequestByRequestId/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to reject supply request");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Supply request rejected successfully:", data);
      // Thực hiện các hành động cần thiết sau khi từ chối thành công
      closeApprovePopup(); // Đóng popup sau khi xử lý thành công
    })
    .catch((error) => {
      console.error("Error rejecting supply request:", error);
      // Xử lý lỗi nếu cần thiết
    });
  updateApprovedQuantitiesFromTable();
  closeApprovePopup(); // Đóng popup sau khi thực hiện hành động
  redirectToAnotherPage();
}

function redirectToAnotherPage() {
  const url = "../nv/confirmSupplyDevice.html";
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
  displayRequestDetails();
});
