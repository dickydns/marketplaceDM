-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 21 Mar 2018 pada 11.57
-- Versi server: 10.1.30-MariaDB
-- Versi PHP: 7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `total` varchar(5) NOT NULL,
  `status` varchar(2) NOT NULL,
  `numOrder` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id_cart`, `id_product`, `id_user`, `total`, `status`, `numOrder`) VALUES
(4, 28, 1, '3', '0', 'DM0306181273439'),
(8, 27, 1, '1', '0', 'DM0306181273439'),
(9, 22, 1, '2', '0', 'DM0306181273439'),
(14, 30, 1, '1', '0', 'DM03061818874602'),
(15, 31, 1, '1', '0', 'DM03061818874602'),
(16, 30, 1, '1', '0', 'DM03071315245023'),
(17, 25, 1, '1', '0', 'DM03072117730879'),
(18, 24, 1, '1', '0', 'DM03072211221844'),
(19, 26, 1, '1', '0', 'DM03131219376276'),
(20, 28, 1, '1', '0', 'DM03131212647638'),
(21, 24, 1, '1', '1', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Motocycle'),
(2, 'Parts');

-- --------------------------------------------------------

--
-- Struktur dari tabel `city`
--

CREATE TABLE `city` (
  `idCity` int(11) NOT NULL,
  `cityName` varchar(50) NOT NULL,
  `idProvince` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `city`
--

INSERT INTO `city` (`idCity`, `cityName`, `idProvince`) VALUES
(1, 'Jakarta', 3),
(2, 'Bandung', 1),
(3, 'Surabaya', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `orderProduct`
--

CREATE TABLE `orderProduct` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `total` varchar(20) NOT NULL,
  `numOrder` varchar(70) NOT NULL,
  `createdAt` datetime NOT NULL,
  `status` varchar(2) NOT NULL,
  `statusPayment` varchar(2) NOT NULL,
  `paymentSlip` text NOT NULL,
  `lastUpdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `orderProduct`
--

INSERT INTO `orderProduct` (`id_order`, `id_user`, `total`, `numOrder`, `createdAt`, `status`, `statusPayment`, `paymentSlip`, `lastUpdate`) VALUES
(17, 1, '1316200000', 'DM0306181273439', '2018-03-06 17:11:30', '1', '2', 'paymentSlip-1520410721666.JPG', '2018-03-04'),
(18, 1, '15200000', 'DM03061818874602', '2018-03-06 18:33:31', '1', '1', 'paymentSlip-1520489840382.JPG', '2018-03-08'),
(19, 1, '4200000', 'DM03071315245023', '2018-03-07 13:04:47', '1', '0', '', '0000-00-00'),
(24, 1, '7553000', 'DM03072211221844', '2018-03-07 22:18:29', '1', '0', '', '0000-00-00'),
(25, 1, '900043000', 'DM03131219376276', '2018-03-13 12:20:27', '1', '0', '', '0000-00-00'),
(26, 1, '200043000', 'DM03131212647638', '2018-03-13 12:23:49', '1', '0', '', '0000-00-00'),
(27, 1, 'NaN', 'DM03131214895585', '2018-03-13 12:24:06', '1', '0', '', '0000-00-00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `price` varchar(20) NOT NULL,
  `category_id` int(11) NOT NULL,
  `stock` varchar(11) NOT NULL,
  `statusProduct` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id_product`, `name`, `description`, `picture`, `price`, `category_id`, `stock`, `statusProduct`) VALUES
(22, 'R1 YZF R1', 'The R1 is underpinned by a diamond design aluminium frame and comes with an inline four, 998cc petrol engine. The YFZR1 gets telescopic forks in front and double swing arm for the rear. Given that the engine produces 197.3bhp and 112.4Nm of torque, Yamaha', 'picture-1520173645032.jpg', '8100000', 1, '3', '1'),
(24, 'Ohlins HD 215 - DYNA ', 'This shock is a 13 3/8shock that is longer than the factory one. Factory length for Dynas are 12 Except for 1993-2008 Wide Glides. This shock does NOT fit the Switchback. See part # HD 816 for Switchbacks. This Shock is the Ultra Ultimate shocks for t&amp', 'picture-1520173964796.jpg', '7510000', 2, '5', '1'),
(25, 'SDC FIVETEN BRAKE ROTORS', 'SDC FiveTen Brake Rotors to match our FiveTen Wheels.\r\n\r\nBrakes are available in the following finishes:\r\n\r\nBlack Anodized\r\nChrome (+$30)\r\nCustom finishes are available upon request!', 'picture-1520174686501.jpg', '9512000', 2, '8', '1'),
(26, 'CBR 1000RR', 'The CBR1000RR, known in some countries as the Fireblade, is a 998 cc liquid-cooled inline four-cylinder sportbike, introduced by Honda in 2004 as the 7th generation of the CBR series of motorcycles that began with the CBR900RR in 1992.', 'picture-1520191279349.png', '900000000', 1, '3', '1'),
(27, 'NINJA 250FI 2018', 'The price of Ninja 250 FI – speaking of motor sport, for sure we will remember motor sport Kawasaki-made famous by the name \"Ninja 250\". This motor has been fitted the system burning fuel injection which makes it more powerful than Ninja 250 Karbu that st', 'picture-1520191506564.jpg', '700000000', 1, '4', '1'),
(28, 'NINJA 1000', 'The Kawasaki Ninja 1000 is a motorcycle in the Ninja series from the Japanese manufacturer Kawasaki sold since 2011. Other than its name, it is unrelated to the Ninja 1000R produced from 1986–89, or to other Ninja motorcycles', 'picture-1520191598453.jpg', '200000000', 1, '2', '1'),
(29, 'Galfer Wave Rotor', 'Galfer Wave Brake Rotors are laser cut from a proprietary high-carbon 420 Stainless Steel that has been heat treated and parallel diamond ground to ensure a perfect surface. The rotors float on an 7071 Aluminum center carrier to ensure optimum pad to roto', 'picture-1520191662667.jpg', '2000000', 2, '4', '1'),
(30, 'Leo Vince LV-10 ', 'Material stainless steel.\r\nFull exhaust system.\r\nLeo Vince Silencer stainless header + locally made.\r\nGuaranteed quality at affordable prices.\r\nSmall dimensions to produce the light.\r\nMaterial AISI 304 STAINLESS STEEL.', 'picture-1520191903163.jpg', '4200000', 2, '4', '1'),
(31, 'OHLINS Steering Damper', 'An essential ingredient in a complete performance package, the Öhlins telescoping steering dampers are still the ones to beat.', 'picture-1520192047871.jpg', '11000000', 2, '5', '1'),
(33, 'Daytona GP Taper', 'Taper Pipe and Silencer design allows the exhaust gas Fows fast and smooth to gain more power in all RPM range. Smaller bottom area makes the muffer can attach deeper to the bikes and reduce offside area, its makes the bikes slimmer and get more angle for', 'picture-1520404319630.jpg', '14000000', 2, '7', '1'),
(34, 'CNC Racing Clear Clutch Cover MV AGUSTA', 'Bikers are the most demanding fans and are always searching for superb quality special components giving a touch of exclusivity to their bike. CNC Racing has reinterpreted the shape of the front brake and clutch tanks, creating a shape that did not exist,', 'picture-1520404833996.jpg', '10000000', 2, '4', '1'),
(35, 'Evotech Performance Tail  R1M', 'Evotech Performance have designed and manufactured a tail tidy for the Ducati Monster 1200 R. CNC machined from lightweight aircraft grade aluminium. Secured in place using existing mounting points. No modifications to your bike are required. Powder Coate', 'picture-1520404949407.jpg', '3800000', 2, '6', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `productTmp`
--

CREATE TABLE `productTmp` (
  `idTmp` int(11) NOT NULL,
  `totalSale` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `productTmp`
--

INSERT INTO `productTmp` (`idTmp`, `totalSale`) VALUES
(3, '6'),
(4, '2'),
(5, '2'),
(6, '2'),
(7, '2'),
(8, '2'),
(9, '2'),
(10, '2'),
(11, '2'),
(12, '2'),
(13, '2'),
(14, '2'),
(15, '2'),
(16, '2'),
(17, '2'),
(18, '2'),
(19, '2'),
(20, '2'),
(21, '2'),
(22, '2'),
(23, '2'),
(24, '2'),
(25, '2'),
(26, '2'),
(27, '2'),
(28, '2'),
(29, '2'),
(30, '2'),
(31, '2'),
(32, '2'),
(33, '2'),
(34, '2'),
(35, '2'),
(36, '2'),
(37, '2'),
(38, '2'),
(39, '2'),
(40, '2'),
(41, '2'),
(42, '2'),
(43, '2'),
(44, '2'),
(45, '2'),
(46, '2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `province`
--

CREATE TABLE `province` (
  `idProvince` int(11) NOT NULL,
  `provinceName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `province`
--

INSERT INTO `province` (`idProvince`, `provinceName`) VALUES
(1, 'Jawa Barat'),
(2, 'Jawa Tengah '),
(3, 'DKI Jakarta');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ShippingCost`
--

CREATE TABLE `ShippingCost` (
  `idShipping` int(11) NOT NULL,
  `idCity` int(11) NOT NULL,
  `cost` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `ShippingCost`
--

INSERT INTO `ShippingCost` (`idShipping`, `idCity`, `cost`) VALUES
(1, 1, '25000'),
(2, 2, '15000'),
(3, 3, '43000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `shippingInfo`
--

CREATE TABLE `shippingInfo` (
  `idShipping` int(11) NOT NULL,
  `services` varchar(30) NOT NULL,
  `servicesNum` varchar(40) NOT NULL,
  `numOrder` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `shippingInfo`
--

INSERT INTO `shippingInfo` (`idShipping`, `services`, `servicesNum`, `numOrder`) VALUES
(2, 'JNE', '100100100100100244', 'DM0306181273439'),
(3, 'JNE', '41122124', 'DM03061818874602');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` text,
  `numberPhone` varchar(13) DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(2) NOT NULL,
  `idCity` int(11) NOT NULL,
  `idProvince` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `name`, `address`, `numberPhone`, `username`, `password`, `role`, `idCity`, `idProvince`) VALUES
(1, 'Dickyperdian', 'Bogor barat, babakan lebak rt 02 / 06 no ', '0857-1863680', 'dickyperdian', 'd100be71a923dc033fd40c4f946db4a8e6137ab5', '1', 3, 2),
(4, 'costumer', '', '', 'costumer', 'abeeaf288026f9ef42fa63a74830f35eb7f3d233', '2', 0, 0),
(5, 'perdian', '', '', 'perdian', '452c029695dae090a830578589aa29496a3bb27c', '2', 0, 0),
(6, 'ferdian', 'tes', '8', 'ferdian', 'd100be71a923dc033fd40c4f946db4a8e6137ab5', '2', 3, 2),
(8, 'dicky', 'bogor\r\n', '0569569595', 'dicky', 'fb2e0d5f69a9e4a0224f3f07f289dc40fd352dba', '2', 3, 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeks untuk tabel `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`idCity`);

--
-- Indeks untuk tabel `orderProduct`
--
ALTER TABLE `orderProduct`
  ADD PRIMARY KEY (`id_order`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`);

--
-- Indeks untuk tabel `productTmp`
--
ALTER TABLE `productTmp`
  ADD PRIMARY KEY (`idTmp`);

--
-- Indeks untuk tabel `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`idProvince`);

--
-- Indeks untuk tabel `ShippingCost`
--
ALTER TABLE `ShippingCost`
  ADD PRIMARY KEY (`idShipping`);

--
-- Indeks untuk tabel `shippingInfo`
--
ALTER TABLE `shippingInfo`
  ADD PRIMARY KEY (`idShipping`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `city`
--
ALTER TABLE `city`
  MODIFY `idCity` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `orderProduct`
--
ALTER TABLE `orderProduct`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `productTmp`
--
ALTER TABLE `productTmp`
  MODIFY `idTmp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `province`
--
ALTER TABLE `province`
  MODIFY `idProvince` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `ShippingCost`
--
ALTER TABLE `ShippingCost`
  MODIFY `idShipping` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `shippingInfo`
--
ALTER TABLE `shippingInfo`
  MODIFY `idShipping` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
