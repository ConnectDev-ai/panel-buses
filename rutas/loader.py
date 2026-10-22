# -*- coding: utf-8 -*-
"""Decodificador de geometría EWKB/WKT a lista de puntos (lon, lat).

Copiado tal cual de `flespi-routes/src/loader.py` (repo `rendimientos.kf`) —
solo la función que `export_bus_viajes_neon.py` necesita, para no depender de
ese repo entero (que trae su propio pipeline de ingestión de ~3.2GB+ de datos,
fuera de alcance acá). Si esa función cambia allá, hay que traer el cambio acá
a mano.
"""
import struct


def parse_ewkb_linestring(hex_str: str) -> list[tuple[float, float]]:
    s = hex_str.strip()
    if s.upper().startswith("LINESTRING"):
        inner = s[s.index("(") + 1: s.rindex(")")]
        coords = []
        for pair in inner.split(","):
            parts = pair.split()
            if len(parts) >= 2:
                coords.append((float(parts[0]), float(parts[1])))
        return coords
    data = bytes.fromhex(s)
    idx = 0
    byte_order = data[idx]; idx += 1
    endian = "<" if byte_order == 1 else ">"
    geom_type = struct.unpack_from(endian + "I", data, idx)[0]; idx += 4
    if geom_type & 0x20000000:
        idx += 4
    n_points = struct.unpack_from(endian + "I", data, idx)[0]; idx += 4
    coords = []
    for _ in range(n_points):
        lon = struct.unpack_from(endian + "d", data, idx)[0]; idx += 8
        lat = struct.unpack_from(endian + "d", data, idx)[0]; idx += 8
        coords.append((lon, lat))
    return coords
