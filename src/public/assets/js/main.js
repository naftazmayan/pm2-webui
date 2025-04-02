async function pm2AppAction(appName, action){
    fetch(`/api/apps/${appName}/${action}`, { method: 'POST'}).finally(() => {

        location.reload();
    })
}

async function updateEnvFile(appName){
    const envTextArea = document.getElementById('textAreaEnv')
    const envValue = envTextArea.value.trim()

    const data = {content: envValue}

    await fetch(`/api/apps/${appName}/editEnv`, { method: 'POST', body: JSON.stringify(data) })
    location.reload();
}



async function selectAndModifyFile() {
    // انتخاب فایل توسط کاربر
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    
    // خواندن محتوا
    const text = await file.text();

    // ایجاد یک مودال برای نمایش و ویرایش محتوا
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.width = "70%";
    modal.style.background = "white";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    modal.style.borderRadius = "8px";
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.style.gap = "10px";
    modal.style.zIndex = "1000";

    // ایجاد تکست‌اریا برای نمایش و ویرایش محتوا
    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "200px";
    textarea.value = text;

    // دکمه ذخیره تغییرات
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.style.background = "#007bff";
    saveButton.style.color = "white";
    saveButton.style.border = "none";
    saveButton.style.padding = "10px";
    saveButton.style.borderRadius = "5px";
    saveButton.style.cursor = "pointer";

    // دکمه بستن مودال
    const closeButton = document.createElement("button");
    closeButton.innerText = "Cancel";
    closeButton.style.background = "#ccc";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";

    // ذخیره تغییرات در فایل
    saveButton.addEventListener("click", async () => {
        const newText = textarea.value;
        const writable = await fileHandle.createWritable();
        await writable.write(newText);
        await writable.close();
        document.body.removeChild(modal);
        console.log("File updated successfully!");
    });

    // بستن مودال
    closeButton.addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    // اضافه کردن المان‌ها به مودال
    modal.appendChild(textarea);
    modal.appendChild(saveButton);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}
