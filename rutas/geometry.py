# -*- coding: utf-8 -*-
"""Simplificación de polilíneas (Douglas-Peucker).

Copiado tal cual de `flespi-routes/src/geometry.py` (repo `rendimientos.kf`) —
solo lo que `export_bus_viajes_neon.py` necesita. Ver nota de `loader.py`.
"""
import math


def _pdist(point, start, end):
    if start == end:
        return math.hypot(point[0] - start[0], point[1] - start[1])
    dx, dy = end[0] - start[0], end[1] - start[1]
    t = max(0.0, min(1.0, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx*dx + dy*dy)))
    return math.hypot(point[0] - (start[0] + t*dx), point[1] - (start[1] + t*dy))


def simplify_route(points: list, epsilon: float) -> list:
    if len(points) < 3:
        return points
    stack, keep = [(0, len(points) - 1)], {0, len(points) - 1}
    while stack:
        s, e = stack.pop()
        md, mi = 0.0, s
        for i in range(s + 1, e):
            d = _pdist(points[i], points[s], points[e])
            if d > md:
                md, mi = d, i
        if md > epsilon:
            keep.add(mi)
            stack += [(s, mi), (mi, e)]
    return [points[i] for i in sorted(keep)]
