$(document).ready(function () {

    // 1. NAVIGASI TAB DENGAN EFEK FADE
    $(".tab-panel").hide();
    $("#tab-alam").show();

    $(".tab").on("click", function () {
        const target = $(this).data("target");

        $(".tab").removeClass("active");
        $(this).addClass("active");

        $(".tab-panel:visible").stop(true, true).fadeOut(180, function () {
            $(target).stop(true, true).fadeIn(250);
        });
    });


    // 2. EFEK ANIMATE PADA KARTU DESTINASI
    $(".destination-card")
        .on("mouseenter", function () {
            $(this).stop(true).animate({
                marginTop: "-6px"
            }, 150);
        })
        .on("mouseleave", function () {
            $(this).stop(true).animate({
                marginTop: "0px"
            }, 150);
        });


    // 3. EFEK SLIDETOGGLE PADA NAVIGASI MOBILE
    $(".menu-toggle").on("click", function () {
        $(".nav-links").stop(true, true).slideToggle(220);
    });

    // Tutup navigasi setelah tautan dipilih di layar kecil
    $(".nav-links a").on("click", function () {
        if ($(window).width() <= 800) {
            $(".nav-links").slideUp(180);
        }
    });


    // 4. SMOOTH SCROLL NAVIGASI
    $('a[href^="#"]').on("click", function (event) {
        const target = $(this).attr("href");

        if (target.length > 1 && $(target).length) {
            event.preventDefault();

            $("html, body").stop().animate({
                scrollTop: $(target).offset().top - 70
            }, 500);
        }
    });


    // MEMILIH PAKET WISATA SECARA OTOMATIS
    $(".pilih-paket").on("click", function () {
        $("#paketPilihan").val($(this).data("paket"));
    });


    // 5. TOMBOL KEMBALI KE ATAS
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 350) {
            $("#backToTop").stop(true, true).fadeIn(200);
        } else {
            $("#backToTop").stop(true, true).fadeOut(200);
        }
    });

    $("#backToTop").on("click", function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 500);
    });


    // CUSTOM VALIDATION NOMOR TELEPON
    $.validator.addMethod("nomorTelepon", function (value, element) {
        return this.optional(element) ||
            /^[0-9]{10,13}$/.test(value);
    }, "Nomor telepon harus terdiri dari 10–13 digit angka.");


    // 6. VALIDASI FORM PEMESANAN
    $("#formPemesanan").validate({

        rules: {
            nama: {
                required: true,
                minlength: 3
            },

            email: {
                required: true,
                email: true
            },

            telepon: {
                required: true,
                nomorTelepon: true
            },

            destinasi: {
                required: true
            },

            paket: {
                required: true
            },

            tanggal: {
                required: true,
                date: true
            },

            peserta: {
                required: true,
                digits: true,
                min: 1,
                max: 20
            }
        },

        messages: {
            nama: {
                required: "Nama lengkap wajib diisi.",
                minlength: "Nama minimal terdiri dari 3 karakter."
            },

            email: {
                required: "Email wajib diisi.",
                email: "Masukkan alamat email dengan format yang benar."
            },

            telepon: {
                required: "Nomor telepon wajib diisi.",
                nomorTelepon: "Nomor telepon harus terdiri dari 10–13 digit angka."
            },

            destinasi: {
                required: "Silakan pilih destinasi tujuan."
            },

            paket: {
                required: "Silakan pilih paket wisata."
            },

            tanggal: {
                required: "Tanggal keberangkatan wajib diisi.",
                date: "Masukkan tanggal yang valid."
            },

            peserta: {
                required: "Jumlah peserta wajib diisi.",
                digits: "Jumlah peserta harus berupa angka bulat.",
                min: "Minimal 1 peserta.",
                max: "Maksimal 20 peserta."
            }
        },

        errorElement: "label",
        errorClass: "error",
        validClass: "valid",

        highlight: function (element) {
            $(element).addClass("error").removeClass("valid");
        },

        unhighlight: function (element) {
            $(element).removeClass("error").addClass("valid");
        },

        submitHandler: function (form) {

            $("#pesanSukses")
                .stop(true, true)
                .prop("hidden", false)
                .hide()
                .slideDown(300);

            // Mengosongkan formulir setelah berhasil divalidasi
            form.reset();

            $("#formPemesanan input, #formPemesanan select")
                .removeClass("valid error");

            $("#formPemesanan").find("label.error").remove();

            // Demo praktikum: data belum dikirim ke server
            return false;
        }

    });

});