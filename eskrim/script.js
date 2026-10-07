$(document).ready(function () {

    // =====================================================
    // DATA PRODUK
    // =====================================================

    const produkData = [
        {
            id: 1,
            nama: "Es Krim Cokelat",
            harga: 15000,
            kategori: "es-krim",
            icon: "🍫",
            desc: "Cokelat premium lembut",
            badge: "Best Seller",
            badgeType: "hot"
        },
        {
            id: 2,
            nama: "Es Krim Strawberry",
            harga: 15000,
            kategori: "es-krim",
            icon: "🍓",
            desc: "Stroberi segar asli",
            badge: "Favorit",
            badgeType: ""
        },
        {
            id: 3,
            nama: "Es Krim Vanilla",
            harga: 13000,
            kategori: "es-krim",
            icon: "🍦",
            desc: "Vanilla klasik creamy",
            badge: "",
            badgeType: ""
        },
        {
            id: 4,
            nama: "Es Krim Mangga",
            harga: 16000,
            kategori: "es-krim",
            icon: "🥭",
            desc: "Mangga manis tropis",
            badge: "Baru",
            badgeType: ""
        },
        {
            id: 5,
            nama: "Sundae Cokelat",
            harga: 25000,
            kategori: "sundae",
            icon: "🍨",
            desc: "Sundae dengan topping cokelat",
            badge: "Best Seller",
            badgeType: "hot"
        },
        {
            id: 6,
            nama: "Sundae Keju",
            harga: 27000,
            kategori: "sundae",
            icon: "🧀",
            desc: "Sundae topping keju melimpah",
            badge: "",
            badgeType: ""
        },
        {
            id: 7,
            nama: "Sundae Buah",
            harga: 28000,
            kategori: "sundae",
            icon: "🍧",
            desc: "Sundae dengan buah segar",
            badge: "Favorit",
            badgeType: ""
        },
        {
            id: 8,
            nama: "Milkshake Cokelat",
            harga: 20000,
            kategori: "minuman",
            icon: "🥤",
            desc: "Milkshake cokelat dingin",
            badge: "",
            badgeType: ""
        },
        {
            id: 9,
            nama: "Milkshake Strawberry",
            harga: 20000,
            kategori: "minuman",
            icon: "🥛",
            desc: "Milkshake stroberi segar",
            badge: "Baru",
            badgeType: ""
        },
        {
            id: 10,
            nama: "Es Teh Manis",
            harga: 8000,
            kategori: "minuman",
            icon: "🧊",
            desc: "Es teh manis segar",
            badge: "",
            badgeType: ""
        },
        {
            id: 11,
            nama: "Es Jeruk",
            harga: 10000,
            kategori: "minuman",
            icon: "🍊",
            desc: "Es jeruk peras asli",
            badge: "",
            badgeType: ""
        },
        {
            id: 12,
            nama: "Float Ice Cream",
            harga: 22000,
            kategori: "minuman",
            icon: "🍹",
            desc: "Minuman soda dengan es krim",
            badge: "Best Seller",
            badgeType: "hot"
        }
    ];


    // =====================================================
    // VARIABEL
    // =====================================================

    let cart = [];
    let currentFilter = "all";
    let searchKeyword = "";


    // =====================================================
    // TAMPILKAN PRODUK
    // =====================================================

    function renderProduk() {

        var grid = $("#produkGrid");

        if (grid.length === 0) {
            console.error("ERROR: #produkGrid tidak ditemukan di HTML");
            return;
        }

        grid.empty();

        var hasil = produkData.filter(function (produk) {

            var cocokKategori =
                currentFilter === "all" ||
                produk.kategori === currentFilter;

            var keyword = searchKeyword.toLowerCase();

            var cocokSearch =
                produk.nama.toLowerCase().indexOf(keyword) !== -1 ||
                produk.desc.toLowerCase().indexOf(keyword) !== -1;

            return cocokKategori && cocokSearch;
        });


        // Jika tidak ada produk
        if (hasil.length === 0) {

            grid.html(
                '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;">' +
                    '<h3>Produk tidak ditemukan</h3>' +
                    '<p>Coba kategori atau kata kunci lain.</p>' +
                '</div>'
            );

            return;
        }


        // Tampilkan produk
        hasil.forEach(function (produk) {

            var badge = "";

            if (produk.badge !== "") {
                badge =
                    '<div class="produk-badge ' +
                    produk.badgeType +
                    '">' +
                    produk.badge +
                    '</div>';
            }


            var card =
                '<div class="produk-card" ' +
                    'data-id="' + produk.id + '" ' +
                    'data-kategori="' + produk.kategori + '">' +

                    badge +

                    '<div class="produk-img">' +
                        produk.icon +
                    '</div>' +

                    '<div class="produk-info">' +

                        '<h3>' +
                            produk.nama +
                        '</h3>' +

                        '<p class="desc">' +
                            produk.desc +
                        '</p>' +

                        '<div class="produk-footer">' +

                            '<div class="produk-price">' +
                                'Rp ' +
                                produk.harga.toLocaleString("id-ID") +
                                '<small>per porsi</small>' +
                            '</div>' +

                            '<button ' +
                                'class="btn-add-cart" ' +
                                'data-id="' + produk.id + '">' +
                                '<i class="fas fa-plus"></i>' +
                            '</button>' +

                        '</div>' +

                    '</div>' +

                '</div>';


            grid.append(card);
        });

        console.log("Produk berhasil ditampilkan:", hasil.length);
    }


    // =====================================================
    // FILTER NAVBAR
    // =====================================================

    $(".nav-link").click(function (e) {

        e.preventDefault();

        $(".nav-link").removeClass("active");
        $(this).addClass("active");

        currentFilter = $(this).attr("data-filter");

        $(".filter-btn").removeClass("active");

        $('.filter-btn[data-cat="' + currentFilter + '"]')
            .addClass("active");

        renderProduk();
    });


    // =====================================================
    // FILTER BUTTON
    // =====================================================

    $(".filter-btn").click(function () {

        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        currentFilter = $(this).attr("data-cat");

        $(".nav-link").removeClass("active");

        $('.nav-link[data-filter="' + currentFilter + '"]')
            .addClass("active");

        renderProduk();
    });


    // =====================================================
    // SEARCH
    // =====================================================

    $("#searchProduk").on("input", function () {

        searchKeyword = $(this).val();

        renderProduk();
    });


    // =====================================================
    // TAMBAH KE KERANJANG
    // =====================================================

    $(document).on("click", ".btn-add-cart", function () {

        var id = Number($(this).attr("data-id"));

        var produk = produkData.find(function (item) {
            return item.id === id;
        });

        if (!produk) {
            return;
        }

        var existing = cart.find(function (item) {
            return item.id === id;
        });

        if (existing) {
            existing.qty++;
        } else {
            cart.push({
                id: produk.id,
                nama: produk.nama,
                harga: produk.harga,
                icon: produk.icon,
                qty: 1
            });
        }

        updateCartUI();

        showToast(
            produk.icon + " " +
            produk.nama +
            " ditambahkan!"
        );
    });


    // =====================================================
    // UPDATE KERANJANG
    // =====================================================

    function updateCartUI() {

        var cartItems = $("#cartItems");

        var totalQty = 0;
        var totalHarga = 0;


        cart.forEach(function (item) {

            totalQty += item.qty;

            totalHarga +=
                item.harga * item.qty;
        });


        $("#cartBadge").text(totalQty);

        $("#cartTotal").text(
            "Rp " +
            totalHarga.toLocaleString("id-ID")
        );


        if (cart.length === 0) {

            cartItems.html(
                '<div class="cart-empty">' +
                    '<i class="fas fa-shopping-cart"></i>' +
                    '<p>Keranjang masih kosong</p>' +
                    '<small>Yuk pilih es krim dulu!</small>' +
                '</div>'
            );

            return;
        }


        var html = "";


        cart.forEach(function (item) {

            html +=
                '<div class="cart-item" data-id="' +
                    item.id +
                '">' +

                    '<div class="cart-item-icon">' +
                        item.icon +
                    '</div>' +

                    '<div class="cart-item-info">' +

                        '<h5>' +
                            item.nama +
                        '</h5>' +

                        '<div class="price">' +
                            "Rp " +
                            (item.harga * item.qty)
                                .toLocaleString("id-ID") +
                        '</div>' +

                        '<div class="qty-control">' +

                            '<button class="qty-btn" ' +
                                'data-action="minus" ' +
                                'data-id="' + item.id + '">' +
                                '−' +
                            '</button>' +

                            '<span class="qty-value">' +
                                item.qty +
                            '</span>' +

                            '<button class="qty-btn" ' +
                                'data-action="plus" ' +
                                'data-id="' + item.id + '">' +
                                '+' +
                            '</button>' +

                        '</div>' +

                    '</div>' +

                    '<button class="cart-item-remove" ' +
                        'data-id="' + item.id + '">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +

                '</div>';
        });


        cartItems.html(html);
    }


    // =====================================================
    // PLUS / MINUS
    // =====================================================

    $(document).on("click", ".qty-btn", function () {

        var id = Number($(this).attr("data-id"));

        var action =
            $(this).attr("data-action");

        var item = cart.find(function (produk) {
            return produk.id === id;
        });

        if (!item) {
            return;
        }


        if (action === "plus") {

            item.qty++;

        } else {

            item.qty--;

            if (item.qty <= 0) {

                cart = cart.filter(function (produk) {
                    return produk.id !== id;
                });
            }
        }


        updateCartUI();
    });


    // =====================================================
    // HAPUS KERANJANG
    // =====================================================

    $(document).on("click", ".cart-item-remove", function () {

        var id =
            Number($(this).attr("data-id"));

        cart = cart.filter(function (item) {
            return item.id !== id;
        });

        updateCartUI();
    });


    // =====================================================
    // BUKA KERANJANG
    // =====================================================

    $("#cartBtn").click(function () {

        $("#cartSidebar").addClass("open");

        $("#cartOverlay").fadeIn(300);
    });


    // =====================================================
    // TUTUP KERANJANG
    // =====================================================

    $("#cartClose, #cartOverlay").click(function () {

        $("#cartSidebar").removeClass("open");

        $("#cartOverlay").fadeOut(300);
    });


    // =====================================================
    // CHECKOUT
    // =====================================================

    $("#btnCheckout").click(function () {

        if (cart.length === 0) {

            showToast("❌ Keranjang masih kosong!");

            return;
        }


        var total = 0;
        var totalQty = 0;


        cart.forEach(function (item) {

            total += item.harga * item.qty;

            totalQty += item.qty;
        });


        var button = $(this);

        button
            .html('<i class="fas fa-spinner fa-spin"></i> Memproses...')
            .prop("disabled", true);


        setTimeout(function () {

            cart = [];

            updateCartUI();


            button
                .html(
                    '<i class="fas fa-check-circle"></i> Checkout Sekarang'
                )
                .prop("disabled", false);


            $("#cartSidebar").removeClass("open");

            $("#cartOverlay").fadeOut(300);


            showToast(
                "✅ Checkout berhasil! " +
                totalQty +
                " item · Rp " +
                total.toLocaleString("id-ID")
            );

        }, 1500);
    });


    // =====================================================
    // TOAST
    // =====================================================

    var toastTimer;

    function showToast(message) {

        clearTimeout(toastTimer);

        $("#toastMsg").text(message);

        $("#toast").addClass("show");


        toastTimer = setTimeout(function () {

            $("#toast").removeClass("show");

        }, 2500);
    }


    // =====================================================
    // HAMBURGER
    // =====================================================

    $("#hamburger").click(function () {

        $("#navMenu").toggleClass("show");

        var icon = $(this).find("i");


        if ($("#navMenu").hasClass("show")) {

            icon
                .removeClass("fa-bars")
                .addClass("fa-times");

        } else {

            icon
                .removeClass("fa-times")
                .addClass("fa-bars");
        }
    });


    // =====================================================
    // MULAI APLIKASI
    // =====================================================

    renderProduk();

    updateCartUI();

    console.log("🍦 Warung Ice Cream aktif!");
    console.log("Jumlah produk:", produkData.length);

});