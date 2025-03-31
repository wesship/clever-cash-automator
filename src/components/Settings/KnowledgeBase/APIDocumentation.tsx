
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { APIEndpointType } from "./types";

interface APIDocumentationProps {
  filteredEndpoints: APIEndpointType[];
}

const APIDocumentation = ({ filteredEndpoints }: APIDocumentationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">API Reference</CardTitle>
        <CardDescription>
          Detailed documentation for integrating with our API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-muted/30 rounded-md border border-border/40">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-medium mb-1">API Documentation v2.1</h3>
              <p className="text-xs text-muted-foreground">Full technical specifications for MoneyHub API integration</p>
            </div>
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Download Docs
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEndpoints.length > 0 ? (
                filteredEndpoints.map((endpoint) => (
                  <TableRow key={endpoint.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{endpoint.path}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          endpoint.method === "GET" ? "default" : 
                          endpoint.method === "POST" ? "secondary" :
                          endpoint.method === "PUT" ? "outline" : "destructive"
                        }
                      >
                        {endpoint.method}
                      </Badge>
                    </TableCell>
                    <TableCell>{endpoint.description}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={endpoint.status === "Stable" ? "default" : "secondary"}
                        className="ml-auto"
                      >
                        {endpoint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No API endpoints found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredEndpoints.length === 0 && (
          <div className="flex items-center justify-center p-8 text-center">
            <div>
              <h3 className="font-medium mb-1">No API endpoints found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t">
        <div className="text-sm text-muted-foreground">
          <span>Need more help with the API?</span>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <ExternalLink className="h-3 w-3" /> Visit Developer Portal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default APIDocumentation;
