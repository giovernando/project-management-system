<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assets = Asset::all();

        return response()->json([
            'success' => true,
            'data' => $assets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'condition' => 'required|string|in:good,fair,poor',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $asset = Asset::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Asset created successfully',
            'data' => $asset
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Asset $asset)
    {
        return response()->json([
            'success' => true,
            'data' => $asset
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Asset $asset)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'quantity' => 'sometimes|required|integer|min:0',
            'condition' => 'sometimes|required|string|in:good,fair,poor',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $asset->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Asset updated successfully',
            'data' => $asset
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();

        return response()->json([
            'success' => true,
            'message' => 'Asset deleted successfully'
        ]);
    }
}
