#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzY2NjA2NTI0LCJleHAiOjE3NjcyMTEzMjR9.iietVOW8ftegiL8PT69dpqinOZiMmfQiqnNp4HkEsgw"

echo "🧪 TEST COMPLET DES ROUTES ADMIN"
echo "Token: ${TOKEN:0:20}..."
echo ""

echo "1. 📊 Dashboard Stats:"
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/admin/dashboard/stats | python3 -m json.tool
echo ""

echo "2. 👥 Liste Utilisateurs:"
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/admin/users | python3 -m json.tool | head -30
echo ""

echo "3. 👤 Profil Admin:"
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/admin/profile | python3 -m json.tool
echo ""

echo "4. 🔐 Test routes publiques (sans token):"
echo "   a) GET /api/all:"
curl -s http://localhost:4000/api/all | head -5
echo ""
echo "   b) GET /health:"
curl -s http://localhost:4000/health
