import { useState, useEffect } from "react";
import API from "./api";

function App() {
  // Auth State'leri
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ürün State'leri (Yeni eklenen girdiler)
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  // Bildirim ve Hata State'leri
  const [message, setMessage] = useState({ text: "", isError: false });
  const [protectedData, setProtectedData] = useState({
    text: "",
    isError: false,
  });

  // Sayfa ilk açıldığında hafızada token var mı diye bak, varsa direkt ürünü ekleme sayfasına al
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 1. REGISTER (Kayıt Olma) İşlemi
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: "", isError: false });
    try {
      await API.post("v1/auth/register", { email, password });
      setMessage({
        text: "Kayıt başarılı! Şimdi giriş yapabilirsiniz.",
        isError: false,
      });
    } catch (error) {
      const errorMsg = error.response?.data || error.message;
      setMessage({
        text:
          "Kayıt Hatası: " +
          (typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg),
        isError: true,
      });
    }
  };

  // 2. LOGIN (Giriş Yapma) İşlemi
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", isError: false });
    try {
      const response = await API.post("v1/auth/login", { email, password });
      const token = response.data.token;

      localStorage.setItem("token", token);
      setIsLoggedIn(true); // Giriş başarılı, ekranı değiştir!
      setMessage({ text: "Giriş başarılı!", isError: false });
    } catch (error) {
      const errorMsg = error.response?.data || error.message;
      setMessage({
        text:
          "Giriş Hatası: " +
          (typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg),
        isError: true,
      });
    }
  };

  // 3. DİNAMİK ÜRÜN KAYDETME İŞLEMİ (POST)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setProtectedData({ text: "", isError: false });

    if (!productName || !productQuantity) {
      setProtectedData({
        text: "Lütfen ürün adı ve miktarını doldurun!",
        isError: true,
      });
      return;
    }

    try {
      // Formdan aldığımız dinamik verileri nesne yapıyoruz
      const productPayload = {
        name: productName,
        quantity: parseInt(productQuantity, 10),
      };

      // v1/auth/saveProduct adresine istek atılıyor (Bir önceki adımda user-service'e bağlamıştık)
      const response = await API.post("v1/auth/saveProduct", productPayload);

      setProtectedData({
        text: `🚀 Başarılı! Ürün Veritabanına Eklendi.\nBackend Cevabı: ${response.data}`,
        isError: false,
      });

      // Formu temizle
      setProductName("");
      setProductQuantity("");
    } catch (error) {
      const errorMsg = error.response?.data || error.message;
      setProtectedData({
        text: `❌ İşlem Başarısız! (Exception Alındı)\nHata Kodu: ${error.response?.status || "Bilinmiyor"}\nDetay: ${typeof errorMsg === "object" ? JSON.stringify(errorMsg) : errorMsg}`,
        isError: true,
      });
    }
  };

  // 4. LOGOUT (Oturumu Kapatma)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Login ekranına geri yönlendir
    setMessage({ text: "Oturum kapatıldı.", isError: false });
    setProtectedData({ text: "", isError: false });
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        maxWidth: "450px",
        margin: "50px auto",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>
        📦 Microservice Auth System
      </h2>

      {/* 🔄 KOŞULLU YÖNLENDİRME: Giriş yapılmadıysa Giriş/Kayıt Formunu göster */}
      {!isLoggedIn ? (
        <div>
          <h4 style={{ color: "#666", marginBottom: "15px" }}>
            Giriş Yapın veya Kaydolun
          </h4>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="email"
              placeholder="E-posta Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button
                onClick={handleRegister}
                style={{
                  flex: 1,
                  padding: "10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                }}
              >
                Kayıt Ol
              </button>
              <button
                onClick={handleLogin}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Giriş Yap
              </button>
            </div>
          </form>

          {message.text && (
            <div
              style={{
                backgroundColor: message.isError ? "#ffebee" : "#e8f5e9",
                color: message.isError ? "#c62828" : "#2e7d32",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "4px",
                fontSize: "14px",
                border: `1px solid ${message.isError ? "#ffcdd2" : "#c8e6c9"}`,
              }}
            >
              {message.text}
            </div>
          )}
        </div>
      ) : (
        /* 🔄 KOŞULLU YÖNLENDİRME: Giriş yapıldıysa Ürün Ekleme Sayfasını göster */
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              backgroundColor: "#e3f2fd",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#0d47a1" }}>
              🔐 Oturum Açık
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "5px 10px",
                backgroundColor: "#d32f2f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Çıkış Yap
            </button>
          </div>

          <h4 style={{ color: "#333", marginBottom: "15px" }}>
            ➕ Yeni Ürün Ekle (Yetki Gerektirir)
          </h4>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="text"
              placeholder="Ürün Adı (e.g. Laptop)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <input
              type="number"
              placeholder="Miktar (e.g. 50)"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />

            <button
              onClick={handleSaveProduct}
              style={{
                padding: "12px",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              Ürünü Kaydet
            </button>
          </form>

          {protectedData.text && (
            <pre
              style={{
                backgroundColor: protectedData.isError ? "#ffebee" : "#222",
                color: protectedData.isError ? "#c62828" : "#fff",
                padding: "15px",
                marginTop: "15px",
                overflowX: "auto",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
                fontSize: "13px",
                fontFamily: "monospace",
                border: protectedData.isError ? "1px solid #ffcdd2" : "none",
              }}
            >
              {protectedData.text}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
