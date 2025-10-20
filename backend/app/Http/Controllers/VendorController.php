<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vendors = Vendor::all();

        return response()->json([
            'success' => true,
            'data' => $vendors
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $vendor = Vendor::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Vendor created successfully',
            'data' => $vendor
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vendor $vendor)
    {
        return response()->json([
            'success' => true,
            'data' => $vendor
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vendor $vendor)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'contact' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $vendor->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Vendor updated successfully',
            'data' => $vendor
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Vendor deleted successfully'
        ]);
    }
}
